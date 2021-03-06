import * as bcrypt from 'bcryptjs';
import { changePasswordSchema } from '../../../../../common/dist';

import { ResolverMap } from '../../../types/graphql-utils';
// import { forgotPasswordLockAccount } from '../../../utils/forgotPasswordLockAccount';
import { createForgotPasswordLink } from '../../../utils/createForgotPasswordLink';
import { User } from '../../../entity/User';
import { expiredKeyError } from './errorMessages';
import { forgotPasswordPrefix } from '../../../constants';
import { formatYupError } from '../../../utils/formatYupError';
import { sendEmail } from '../../../utils/sendEmail';

export const resolvers: ResolverMap = {
  Mutation: {
    sendForgotPasswordEmail: async (
      _,
      { email }: GQL.ISendForgotPasswordEmailOnMutationArguments,
      { redis }
    ) => {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return { ok: true };
        // return [
        //   {
        //     path: 'email',
        //     message: userNotFoundError,
        //   },
        // ];
      }
      const userId = user.id;
      // await forgotPasswordLockAccount(userId, redis);
      const url = await createForgotPasswordLink(
        process.env.FRONTEND_HOST as string,
        userId,
        redis
      );

      await sendEmail(email, url, 'Reset password');

      return true;
    },
    forgotPasswordChange: async (
      _,
      { newPassword, key }: GQL.IForgotPasswordChangeOnMutationArguments,
      { redis }
    ) => {
      const redisKey = `${forgotPasswordPrefix}${key}`;
      const userId = await redis.get(redisKey);
      if (!userId) {
        return [
          {
            path: 'newPassword',
            message: expiredKeyError,
          },
        ];
      }

      try {
        await changePasswordSchema.validate(
          { newPassword },
          { abortEarly: false }
        );
      } catch (err) {
        return formatYupError(err);
      }

      const newHashedPassword = await bcrypt.hash(newPassword, 10);

      const updatePromise = User.update(
        { id: userId },
        { accountLocked: false, password: newHashedPassword }
      );

      const deleteKeyPromise = redis.del(redisKey);

      await Promise.all([updatePromise, deleteKeyPromise]);

      return null;
    },
  },
};
