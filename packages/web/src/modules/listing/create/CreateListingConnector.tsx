import * as React from 'react';
import { Form as AntForm, Button } from 'antd';
import { Form, Formik, FormikActions } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
import { withCreateListing, WithCreateListingProps } from '@abb/controllers';
import { FileWithPreview } from 'react-dropzone';

import { Page1 } from './view/Page1';
import { Page2 } from './view/Page2';
import { Page3 } from './view/Page3';

const FormItem = AntForm.Item;

interface FormValues {
  picture: FileWithPreview | null;
  name: string;
  category: string;
  description: string;
  price: number;
  beds: number;
  guests: number;
  latitude: number;
  longitude: number;
  amenities: string[];
}

interface State {
  page: number;
}

// tslint:disable-next-line:jsx-key
const pages = [<Page1 />, <Page2 />, <Page3 />];
class C extends React.PureComponent<
  RouteComponentProps<{}> & WithCreateListingProps,
  State
> {
  state = {
    page: 0,
  };

  submit = async (
    values: FormValues,
    { setSubmitting }: FormikActions<FormValues>
  ) => {
    console.log('Values:', values);
    await this.props.createListing(values);
    setSubmitting(false);
  };

  nextPage = () => this.setState(state => ({ page: state.page + 1 }));

  render() {
    // const { history } = this.props;
    return (
      <Formik<{}, FormValues>
        initialValues={{
          picture: null,
          name: '',
          category: '',
          description: '',
          price: 0,
          beds: 0,
          guests: 0,
          latitude: 0,
          longitude: 0,
          amenities: [''],
        }}
        onSubmit={this.submit}
      >
        {({ isSubmitting, values }) =>
          console.log(values) || (
            <Form style={{ display: 'flex' }}>
              <div style={{ width: 400, margin: 'auto' }}>
                {pages[this.state.page]}
                <FormItem>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {this.state.page === pages.length - 1 ? (
                      <div>
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={isSubmitting}
                        >
                          Create Listing
                        </Button>
                      </div>
                    ) : (
                      <Button type="primary" onClick={this.nextPage}>
                        Next Page
                      </Button>
                    )}
                  </div>
                </FormItem>
              </div>
            </Form>
          )
        }
      </Formik>
    );
  }
}

export const CreateListingConnector = withCreateListing(C);
