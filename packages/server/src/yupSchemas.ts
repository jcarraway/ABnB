import * as yup from 'yup';

import { passwordTooShort } from './modules/user/register/errorMessages';

export const passwordValidation = yup
  .string()
  .min(3, passwordTooShort)
  .max(255);
