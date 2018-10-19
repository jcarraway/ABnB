import { ResolverMap } from '../../../types/graphql-utils';
import { Listing } from '../../../entity/Listing';
import { getConnection } from 'typeorm';

export const resolvers: ResolverMap = {
  Query: {
    searchListings: async (
      _,
      { input: { name, guests, beds }, limit, offset }
    ) => {
      let listingQueryBuilder = getConnection()
        .getRepository(Listing)
        .createQueryBuilder('l');

      if (guests) {
        listingQueryBuilder = listingQueryBuilder.andWhere(
          'l.guests = :guests',
          { guests }
        );
      }

      if (beds) {
        listingQueryBuilder = listingQueryBuilder.andWhere('l.beds = :beds', {
          beds,
        });
      }

      if (name) {
        listingQueryBuilder = listingQueryBuilder.andWhere(
          'l.name ilike :name',
          {
            name: `%${name}%`,
          }
        );
      }

      return listingQueryBuilder
        .take(limit)
        .skip(offset)
        .getMany();
    },
  },
};
