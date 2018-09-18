import * as React from 'react';
import { Field } from 'formik';

import { InputField } from '../../../../modules/shared/InputField';

export const Page2 = () => (
  <React.Fragment>
    <Field name="price" component={InputField} placeholder="Price" />
    <Field name="beds" component={InputField} placeholder="Beds" />
    <Field name="guests" component={InputField} placeholder="Guests" />
  </React.Fragment>
);
