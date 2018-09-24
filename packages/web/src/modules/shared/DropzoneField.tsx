import * as React from 'react';
import { FieldProps } from 'formik';

const FormItem = Form.Item;

// const Option = Select.Option;

// const children: any[] = [];

export const DropzoneField: React.SFC<
  FieldProps<any> & {
    input: any;
    prefix: React.ReactNode;
    label?: string;
    mode?: any;
    children: any[];
  }
> = ({
  input,
  field: { onChange, onBlur: __, ...field }, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  children,
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  const handleChange = (newValue: any) => {
    console.log('new value:', newValue);
    console.log('field name:', field.name);
    console.log('field value:', field.value);
    setFieldValue(field.name, newValue);
    field.value = newValue;
  };

  if (props.mode === 'tags') {
    field.value = [];
  }

  // const children: any[] = [];

  // for (let i = 10; i < 36; i++) {
  //   children.push(
  //     <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
  //   );
  // }

  return (
    <FormItem
      label={label}
      help={errorMsg}
      validateStatus={errorMsg ? 'error' : undefined}
    >
      <Select
        {...field}
        // {...input}
        {...props}
        // mode="tags"
        // tslint:disable-next-line:jsx-no-lambda
        // onChange={(newValue: any) => setFieldValue(field.name, newValue)}
        onChange={handleChange}
      >
        {children}
      </Select>
    </FormItem>
  );
};
