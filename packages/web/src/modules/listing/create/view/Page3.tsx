import * as React from 'react';
import { Field } from 'formik';

import { InputField } from '../../../../modules/shared/InputField';
import { TagField } from '../../../shared/TagField';

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

    <Field name="amenities" component={TagField} placeholder="Amenities" />
  </React.Fragment>
);
