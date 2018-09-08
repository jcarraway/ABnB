import * as yup from 'yup';

export const emailTooShort: string = 'email must be at least 3 characters';
export const invalidEmail: string = 'email must be a valid email';
export const passwordTooShort: string =
  'password must be at least 3 characters';

export const passwordValidation = yup
  .string()
  .min(3, passwordTooShort)
  .max(255)
  .required();

export const userValidationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailTooShort)
    .max(255)
    .email(invalidEmail)
    .required(),
  password: passwordValidation,
});

const invalidLogin = 'invalid login';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, invalidLogin)
    .max(255, invalidLogin)
    .email(invalidLogin)
    .required(),
  password: yup
    .string()
    .min(3, invalidLogin)
    .max(255, invalidLogin)
    .required(),
});
