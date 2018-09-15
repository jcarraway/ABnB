import { ResolverMap } from '../../../types/graphql-utils';
import { Listing } from '../../../../../../node_modules/@abb/server/src/entity/Listing';

export const resolvers: ResolverMap = {
  Mutation: {
    createListing: async (_, { input }, { session }) => {
      console.log(session);
      await Listing.create({
        ...input,
        pictureUrl: '',
        userId: session.userId,
      }).save();

      return true;
    },
  },
};
