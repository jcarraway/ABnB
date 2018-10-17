import { ResolverMap } from '../../../types/graphql-utils';
import { Listing } from '../../../entity/Listing';
import { processUpload } from '../shared/processUpload';
// import { isAuthenticated } from '../../../middleware/isAuthenticated';

export const resolvers: ResolverMap = {
  Mutation: {
    updateListing: async (_, { listingId, input: { picture, ...data } }) => {
      // isAuthenticated(session);

      // const pictureUrl = picture ? await processUpload(picture) : null;

      if (picture) {
        data.pictureUrl = await processUpload(picture);
      }

      await Listing.update(
        { id: listingId },
        {
          ...data,
        }
      );

      return true;
    },
  },
};
