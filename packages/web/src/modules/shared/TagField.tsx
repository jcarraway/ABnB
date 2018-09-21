import * as React from 'react';
import { FieldProps } from 'formik';
import { Form, Select } from 'antd';

const FormItem = Form.Item;

const Option = Select.Option;

// const children: any[] = [];

export const TagField: React.SFC<
  FieldProps<any> & {
    prefix: React.ReactNode;
    label?: string;
    input?: any;
    mode?: any;
    children: any[];
  }
> = ({
  input,
  children,
  field: { onChange, onBlur: _, ...field }, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  const handleChange = (newValue: any) => {
    setFieldValue(field.name, newValue);
  };

  if (props.mode === 'tags') {
    input.value = [];
  }

  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  return (
    <FormItem
      label={label}
      help={errorMsg}
      validateStatus={errorMsg ? 'error' : undefined}
    >
      <Select
        {...field}
        {...props}
        mode="tags"
        // onChange={(newValue: any) => setFieldValue(field.name, newValue)}
        onChange={handleChange}
      >
        {children}
      </Select>
    </FormItem>
  );
};
