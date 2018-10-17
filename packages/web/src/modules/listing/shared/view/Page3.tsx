import * as React from 'react';
import { Field } from 'formik';
import { Select } from 'antd';

import { SelectField } from '../../../shared/SelectField';
import { LocationField } from '../../../shared/LocationField';

const Option = Select.Option;

export const Page3 = () => (
  <React.Fragment>
    <Field name="temporary" component={LocationField} />

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
