import * as React from 'react';
import { Field } from 'formik';

import { InputField } from '../../../../modules/shared/InputField';

export const Page2 = () => (
  <React.Fragment>
    <Field
      name="price"
      label="Price"
      component={InputField}
      useNumberInput={true}
      placeholder="Price"
    />

    <Field
      name="beds"
      label="Beds"
      component={InputField}
      useNumberInput={true}
      placeholder="Beds"
    />

    <Field
      name="guests"
      label="Guests"
      component={InputField}
      useNumberInput={true}
      placeholder="Guests"
    />
  </React.Fragment>
);
