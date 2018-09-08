import * as React from 'react';
import { Form as AntForm, Icon, Button } from 'antd';
import { withFormik, FormikProps, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import { loginSchema } from '@abb/common';
import { NormalizedErrorMap } from '@abb/controllers';

import { InputField } from '../../shared/InputField';

const FormItem = AntForm.Item;

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <Form style={{ display: 'flex' }}>
        <div style={{ width: 400, margin: 'auto' }}>
          <Field
            name="email"
            component={InputField}
            prefix={
              <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} /> as any
            }
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={InputField}
            prefix={
              <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} /> as any
            }
            placeholder="Password"
          />
          <FormItem>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Login
            </Button>
          </FormItem>
          <FormItem>
            Or <Link to="/register">register!</Link>
          </FormItem>
        </div>
      </Form>
    );
  }
}

export const LoginView = withFormik<Props, FormValues>({
  validationSchema: loginSchema,
  validateOnBlur: false,
  validateOnChange: false,
  mapPropsToValues: () => ({ email: '', password: '' }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  },
})(C);
