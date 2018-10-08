import { ResolverMap } from '../../../types/graphql-utils';
import { Message } from '../../../entity/Message';
import { isAuthenticated } from '../../shared/isAuthenticated';

export const resolvers: ResolverMap = {
  Message: {
    user: ({ userId }, _, { userLoader }) => userLoader.load(userId),
  },
  Query: {
    findMessages: async (_, { listingId }, { session }) => {
      console.log('is authenticated', isAuthenticated(session));
      return Message.find({
        where: {
          listingId,
          userId: session.userId,
        },
      });
    },
  },
};
