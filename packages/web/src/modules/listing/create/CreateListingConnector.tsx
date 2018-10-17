import * as React from 'react';
import { FormikActions } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
import { withCreateListing, WithCreateListingProps } from '@abb/controllers';
import { ListingFormValues, ListingForm } from '../shared/ListingForm';

class C extends React.PureComponent<
  RouteComponentProps<{}> & WithCreateListingProps
> {
  state = {
    page: 0,
  };

  submit = async (
    values: ListingFormValues,
    { setSubmitting }: FormikActions<ListingFormValues>
  ) => {
    console.log('Values:', values);
    await this.props.createListing(values);
    setSubmitting(false);
  };

  render() {
    return <ListingForm submit={this.submit} />;
  }
}

export const CreateListingConnector = withCreateListing(C);
