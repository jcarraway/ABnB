import * as React from 'react';
import { Field } from 'formik';

import { InputField } from '../../../../modules/shared/InputField';
import { DropzoneField } from '../../../shared/DropzoneField';

export const Page1 = () => (
  <React.Fragment>
    <Field name="name" component={InputField} placeholder="Name" />
    <Field name="category" component={InputField} placeholder="Category" />
    <Field
      name="description"
      component={InputField}
      placeholder="Description"
    />
    <Field name="picture" component={DropzoneField} />
  </React.Fragment>
);
