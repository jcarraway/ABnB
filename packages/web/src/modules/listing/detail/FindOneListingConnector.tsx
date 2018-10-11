import * as React from 'react';
import { FindOneListing } from '@abb/controllers';
import { RouteComponentProps } from 'react-router-dom';

export class FindOneListingConnector extends React.PureComponent<
  RouteComponentProps<{ listingId: string }>
> {
  render() {
    const {
      match: {
        params: { listingId },
      },
    } = this.props;
    return (
      <FindOneListing listingId={listingId}>
        {data => {
          console.log(data);

          if (!data.listing) {
            return <div>...loading</div>;
          }
          return <div>{data.listing.name}</div>;
        }}
      </FindOneListing>
    );
  }
}
