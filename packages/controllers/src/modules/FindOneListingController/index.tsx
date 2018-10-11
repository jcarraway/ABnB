// @ts-ignore
import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  FindOneListingQuery_findOneListing,
  FindOneListingQuery,
  FindOneListingQueryVariables,
} from '../../schemaTypes';

export const findOneListingQuery = gql`
  query FindOneListingQuery($id: String!) {
    findOneListing(id: $id) {
      id
      name
      shortLink
      latitude
      longitude
      description
      category
      price
      beds
      guests
      pictureUrl
      owner {
        id
        email
      }
    }
  }
`;

interface WithFindOneListing {
  listing: FindOneListingQuery_findOneListing | null;
  loading: boolean;
}

interface Props {
  listingId: string;
  children: (data: WithFindOneListing) => JSX.Element | null;
}

export class FindOneListing extends React.PureComponent<Props> {
  render() {
    const { children, listingId } = this.props;
    return (
      <Query<FindOneListingQuery, FindOneListingQueryVariables>
        query={findOneListingQuery}
        variables={{ id: listingId }}
      >
        {({ data, loading }) => {
          let listing: FindOneListingQuery_findOneListing | null = null;

          if (data && !loading && data.findOneListing) {
            listing = data.findOneListing;
          }

          return children({
            listing,
            loading,
          });
        }}
      </Query>
    );
  }
}
