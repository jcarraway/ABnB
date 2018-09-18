import * as React from 'react';
import { Form as AntForm, Button } from 'antd';
import { Form, Formik } from 'formik';
import { RouteComponentProps } from 'react-router-dom';

import { Page1 } from './view/Page1';
import { Page2 } from './view/Page2';
import { Page3 } from './view/Page3';

const FormItem = AntForm.Item;

interface FormValues {
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
export class CreateListingConnector extends React.PureComponent<
  RouteComponentProps<{}>,
  State
> {
  state = {
    page: 0,
  };

  submit = (values: any) => {
    console.log('Values:', values);
  };

  nextPage = () => this.setState(state => ({ page: state.page + 1 }));

  render() {
    // const { history } = this.props;
    return (
      <Formik<{}, FormValues>
        initialValues={{
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
        {() => (
          <Form style={{ display: 'flex' }}>
            <div style={{ width: 400, margin: 'auto' }}>
              {pages[this.state.page]}
              <FormItem>
                {this.state.page === pages.length - 1 ? (
                  <Button type="primary" htmlType="submit">
                    Create Listing
                  </Button>
                ) : (
                  <Button type="primary" onClick={this.nextPage}>
                    Next Page
                  </Button>
                )}
              </FormItem>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}
