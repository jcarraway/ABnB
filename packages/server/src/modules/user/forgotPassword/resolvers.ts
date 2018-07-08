import * as yup from 'yup';
import * as bcrypt from 'bcryptjs';
import { passwordValidation } from '@abb/common';

import { ResolverMap } from '../../../types/graphql-utils';
import { forgotPasswordLockAccount } from '../../../utils/forgotPasswordLockAccount';
import { createForgotPasswordLink } from '../../../utils/createForgotPasswordLink';
import { User } from '../../../entity/User';
import { userNotFoundError, expiredKeyError } from './errorMessages';
import { forgotPasswordPrefix } from '../../../constants';
import { formatYupError } from '../../../utils/formatYupError';

const schema = yup.object().shape({
  newPassword: passwordValidation,
});

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
        return [
          {
            path: 'email',
            message: userNotFoundError,
          },
        ];
      }
      const userId = user.id;
      await forgotPasswordLockAccount(userId, redis);
      // @TODO: add frontend URL
      await createForgotPasswordLink('', userId, redis);
      // @TODO: send email with URL
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
            path: 'key',
            message: expiredKeyError,
          },
        ];
      }

      try {
        await schema.validate({ newPassword }, { abortEarly: false });
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
