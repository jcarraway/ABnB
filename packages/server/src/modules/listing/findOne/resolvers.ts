import { ResolverMap } from '../../../types/graphql-utils';
import { Listing } from '../../../entity/Listing';

export const resolvers: ResolverMap = {
  Query: {
    findOneListing: async (_, { id }) => {
      const listing = await Listing.findOne({ where: { id } });
      return listing;
    },
  },
};
