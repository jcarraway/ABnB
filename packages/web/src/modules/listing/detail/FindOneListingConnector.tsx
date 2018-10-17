import * as React from 'react';
import { FindOneListing } from '@abb/controllers';
import { RouteComponentProps, Link } from 'react-router-dom';

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
          return (
            <div>
              <div>{data.listing.name}</div>
              <div>
                <Link to={`/listing/${listingId}/chat`}>Chat</Link>
              </div>
              <div>
                <Link to={`/listing/${listingId}/edit`}>Edit</Link>
              </div>
            </div>
          );
        }}
      </FindOneListing>
    );
  }
}
