import * as React from 'react';
import { View, Text } from 'react-native';
import { Formik, Field } from 'formik';
import { Button, Card } from 'react-native-elements';

import { InputField } from '../../shared/InputField';
import { withCreateListing, WithCreateListingProps } from '@abb/controllers';
import { RouteComponentProps } from 'react-router-native';

interface FormValues {
  picture: null;
  name: string;
  category: string;
  description: string;
  price: string;
  beds: string;
  guests: string;
  latitude: string;
  longitude: string;
  amenities: string[];
}

// tslint:disable-next-line:jsx-key
class C extends React.PureComponent<
  RouteComponentProps<{}> & WithCreateListingProps
> {
  submit = async (
    values: FormValues
    // { setSubmitting }: FormikActions<FormValues>
  ) => {
    console.log('Values:', values);
    // await this.props.createListing(values);
    // setSubmitting(false);
  };

  render() {
    return (
      <Formik<FormValues>
        initialValues={{
          picture: null,
          name: '',
          category: '',
          description: '',
          price: '0',
          beds: '0',
          guests: '0',
          latitude: '0',
          longitude: '0',
          amenities: [''],
        }}
        onSubmit={this.submit}
      >
        {({ handleSubmit }) => (
          <View
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card>
              <Text style={{ fontSize: 30, marginBottom: 10 }}>
                Create Listing
              </Text>
              <Field
                name="name"
                component={InputField}
                placeholder="Name"
                containerStyle={{ width: '100%' }}
                autoCapitalize="none"
              />
              <Field
                name="category"
                component={InputField}
                placeholder="Category"
                containerStyle={{ width: '100%' }}
                autoCapitalize="none"
              />
              <Field
                name="description"
                component={InputField}
                placeholder="Description"
                containerStyle={{ width: '100%' }}
                autoCapitalize="none"
              />
              <Field
                name="price"
                label="Price"
                component={InputField}
                containerStyle={{ width: '100%' }}
                autoCapitalize="none"
              />
              <Field
                name="beds"
                label="Beds"
                component={InputField}
                containerStyle={{ width: '100%' }}
                autoCapitalize="none"
              />
              <Field
                name="latitude"
                label="Latitude"
                component={InputField}
                containerStyle={{ width: '100%' }}
                autoCapitalize="none"
              />
              <Field
                name="longitude"
                label="Longitude"
                component={InputField}
                containerStyle={{ width: '100%' }}
                autoCapitalize="none"
              />
              <Button
                style={{ marginTop: 10 }}
                title="Save Listing"
                onPress={handleSubmit as any}
              />
            </Card>
          </View>
        )}
      </Formik>
    );
  }
}

export const CreateListingConnector = withCreateListing(C);
