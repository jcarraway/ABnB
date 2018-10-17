import * as React from 'react';
import { FindOneListing, UpdateListing } from '@abb/controllers';
import { RouteComponentProps } from 'react-router-dom';
import { ListingForm, defaultListingFormValues } from '../shared/ListingForm';

export class UpdateListingConnector extends React.PureComponent<
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

          const { id: _, owner: __, shortLink: ___, ...listing } = data.listing;

          return (
            <UpdateListing>
              {({ updateListing }) => (
                <ListingForm
                  submit={async values => {
                    const { __typename: ____, ...cleanValues } = values as any;

                    if (cleanValues.pictureUrl) {
                      const parts = cleanValues.pictureUrl.split('/');
                      cleanValues.pictureUrl = parts[parts.length - 1];
                    }

                    const result = await updateListing({
                      variables: { input: cleanValues, listingId },
                    });
                    console.log(result);
                  }}
                  initialValues={{
                    ...defaultListingFormValues,
                    ...listing,
                  }}
                />
              )}
            </UpdateListing>
          );
        }}
      </FindOneListing>
    );
  }
}
