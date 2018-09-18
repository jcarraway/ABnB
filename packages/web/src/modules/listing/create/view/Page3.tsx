import * as React from 'react';
import { Field } from 'formik';

import { InputField } from '../../../../modules/shared/InputField';

export const Page3 = () => (
  <React.Fragment>
    <Field name="latitude" component={InputField} placeholder="Latitude" />
    <Field name="longitude" component={InputField} placeholder="Longitude" />
    <Field name="amenities" component={InputField} placeholder="Amenities" />
  </React.Fragment>
);
