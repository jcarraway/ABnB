import { ResolverMap } from '../../../types/graphql-utils';
import { removeAllUsersSessions } from '../../../utils/removeAllUsersSessions';

export const resolvers: ResolverMap = {
  Mutation: {
    logout: async (_, __, { session, redis, res }) => {
      const { userId } = session;
      if (userId) {
        await removeAllUsersSessions(userId, redis);
        session.destroy(err => {
          if (err) {
            console.error(err);
          }
        });
        res.clearCookie('xid');
        return true;
      }
      return false;
    },
  },
};
