import * as React from 'react';
import { View, Text } from 'react-native';
import { Formik, Field, FormikActions } from 'formik';
import { Button, Card } from 'react-native-elements';
import { RouteComponentProps } from 'react-router-native';
import { withCreateListing, WithCreateListingProps } from '@abb/controllers';

import { InputField } from '../../shared/InputField';
import { CheckboxGroup } from '../../shared/CheckboxGroup';
import { ImageField } from '../../shared/ImageField';
import { ReactNativeFile } from 'apollo-upload-client';

interface FormValues {
  picture: ReactNativeFile | null;
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
    { price, beds, guests, latitude, longitude, ...values }: FormValues,
    { setSubmitting }: FormikActions<FormValues>
  ) => {
    console.log('Values:', values);
    await this.props.createListing({
      ...values,
      price: parseInt(price, 10),
      beds: parseInt(beds, 10),
      guests: parseInt(guests, 10),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });
    setSubmitting(false);
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
          amenities: [],
        }}
        onSubmit={this.submit}
      >
        {({ handleSubmit, values }) =>
          console.log(values) || (
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
                  name="picture"
                  title="Pick a picture"
                  component={ImageField}
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
                  keyboardType="numeric"
                  containerStyle={{ width: '100%' }}
                  autoCapitalize="none"
                />
                <Field
                  name="beds"
                  label="Beds"
                  component={InputField}
                  keyboardType="numeric"
                  containerStyle={{ width: '100%' }}
                  autoCapitalize="none"
                />
                <Field
                  name="latitude"
                  label="Latitude"
                  component={InputField}
                  keyboardType="numeric"
                  containerStyle={{ width: '100%' }}
                  autoCapitalize="none"
                />
                <Field
                  name="longitude"
                  label="Longitude"
                  component={InputField}
                  keyboardType="numeric"
                  containerStyle={{ width: '100%' }}
                  autoCapitalize="none"
                />
                <Field
                  name="amenities"
                  options={['pool', 'spa', 'ferris wheel']}
                  component={CheckboxGroup}
                />
                <Button
                  style={{ marginTop: 10 }}
                  title="Save Listing"
                  onPress={handleSubmit as any}
                />
              </Card>
            </View>
          )
        }
      </Formik>
    );
  }
}

export const CreateListingConnector = withCreateListing(C);
