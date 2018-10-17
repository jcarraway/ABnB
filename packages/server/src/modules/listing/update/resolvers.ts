import { getConnection } from 'typeorm';

import { ResolverMap } from '../../../types/graphql-utils';
import { Listing } from '../../../entity/Listing';
import { processUpload } from '../shared/processUpload';
import { listingCacheKey } from '../../../constants';
// import { isAuthenticated } from '../../../middleware/isAuthenticated';

export const resolvers: ResolverMap = {
  Mutation: {
    updateListing: async (_, { listingId, input: { picture, ...data } }, {redis}) => {
      // isAuthenticated(session);

      // const pictureUrl = picture ? await processUpload(picture) : null;

      if (picture) {
        data.pictureUrl = await processUpload(picture);
      }

      const {
        raw: [newListing],
      } = await getConnection()
        .createQueryBuilder()
        .update(Listing)
        .set({ ...data })
        .where('id = :id', { id: listingId })
        .returning('*')
        .execute();

      const listings = await redis.lrange(listingCacheKey, 0, -1);
      const idx = listings.findIndex((x: string) => 
        JSON.parse(x).id === listingId
      )
      await redis.lset(listingCacheKey, idx, JSON.stringify(newListing))

      return true;
    },
  },
};
