import * as React from 'react';
import { FieldProps } from 'formik';
import Dropzone from 'react-dropzone';
import { Button } from 'antd';

export const DropzoneField: React.SFC<FieldProps<any>> = ({
  field: { name, value }, // { name, value, onChange, onBlur }
  form: { setFieldValue, values, setValues }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { pictureUrl } = values;
  const pUrl = (value ? value.preview : null) || pictureUrl;
  return (
    <div>
      <Dropzone
        accept="image/jpeg, image/png"
        multiple={false}
        // tslint:disable-next-line:jsx-no-lambda
        onDrop={([file]) => {
          setFieldValue(name, file);
        }}
        {...props}
      >
        <p>Try dropping some files here, or click to select files to upload.</p>
      </Dropzone>
      {pUrl && <img src={pUrl} style={{ maxHeight: 200 }} />}
      <Button
        onClick={() =>
          setValues({
            ...values,
            pictureUrl: null,
            picture: null,
          })
        }
      >
        Remove photo
      </Button>
    </div>
  );
};
