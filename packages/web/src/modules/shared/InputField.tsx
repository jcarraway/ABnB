import * as React from 'react';
import { FieldProps } from 'formik';
import { Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;

export const InputField: React.SFC<
  FieldProps<any> & {
    prefix: React.ReactNode;
    label?: string;
    useNumberInput?: boolean;
  }
> = ({
  field: { onChange, ...field }, // { name, value, onChange, onBlur }
  useNumberInput = false,
  label,
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  const Comp = useNumberInput ? InputNumber : Input;

  return (
    <FormItem
      label={label}
      help={errorMsg}
      validateStatus={errorMsg ? 'error' : undefined}
    >
      <Comp
        {...field}
        {...props}
        onChange={
          useNumberInput
            ? (newValue: any) => setFieldValue(field.name, newValue)
            : onChange
        }
      />
    </FormItem>
  );
};
