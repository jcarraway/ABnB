import * as React from 'react';
import { Field } from 'formik';
import { Select } from 'antd';

import { InputField } from '../../../../modules/shared/InputField';
import { SelectField } from '../../../shared/SelectField';

const Option = Select.Option;

export const Page3 = () => (
  <React.Fragment>
    <Field
      name="latitude"
      label="Latitude"
      component={InputField}
      useNumberInput={true}
      placeholder="Latitude"
    />

    <Field
      name="longitude"
      label="Longitude"
      component={InputField}
      useNumberInput={true}
      placeholder="Longitude"
    />

    <Field
      name="amenities"
      component={SelectField}
      placeholder="Amenities"
      mode="tags"
    >
      <Option key="one" value="one">
        One
      </Option>
      <Option key="two" value="two">
        Two
      </Option>
    </Field>
  </React.Fragment>
);
