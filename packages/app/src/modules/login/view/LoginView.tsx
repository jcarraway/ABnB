import * as React from 'react';
import { withFormik, FormikErrors, FormikProps, Field } from 'formik';
import { View, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { loginSchema } from '@abb/common';

import { InputField } from '../../shared/InputField';

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  onFinish: () => void;
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>Login</Text>
          <Field
            name="email"
            component={InputField}
            placeholder="Email"
            containerStyle={{ width: '100%' }}
            autoCapitalize="none"
          />
          <Field
            name="password"
            secureTextEntry={true}
            component={InputField}
            placeholder="Password"
            containerStyle={{ width: '100%' }}
            autoCapitalize="none"
          />
          <Button
            style={{ marginTop: 10 }}
            title="Login"
            onPress={handleSubmit as any}
          />
        </Card>
      </View>
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
      return setErrors(errors);
    }
    props.onFinish();
  },
})(C);
