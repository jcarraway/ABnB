import * as React from 'react';
import { Form as AntForm, Icon, Button } from 'antd';
import { withFormik, FormikProps, Field, Form } from 'formik';
import { changePasswordSchema } from '@abb/common';
import {
  NormalizedErrorMap,
  ForgotPasswordChangeMutationVariables,
} from '@abb/controllers';

import { InputField } from '../../shared/InputField';

const FormItem = AntForm.Item;

interface FormValues {
  newPassword: string;
}

interface Props {
  onFinish: () => void;
  token: string;
  submit: (
    values: ForgotPasswordChangeMutationVariables
  ) => Promise<NormalizedErrorMap | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <Form style={{ display: 'flex' }}>
        <div style={{ width: 400, margin: 'auto' }}>
          <Field
            name="newPassword"
            type="password"
            component={InputField}
            prefix={
              <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} /> as any
            }
            placeholder="New Password"
          />
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Change password
            </Button>
          </FormItem>
        </div>
      </Form>
    );
  }
}

export const ChangePasswordView = withFormik<Props, FormValues>({
  validationSchema: changePasswordSchema,
  mapPropsToValues: () => ({ newPassword: '' }),
  handleSubmit: async ({ newPassword }, { props, setErrors }) => {
    const errors = await props.submit({ newPassword, key: props.token });
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  },
})(C);
