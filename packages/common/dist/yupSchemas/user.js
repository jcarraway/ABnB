"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
exports.emailTooShort = 'email must be at least 3 characters';
exports.invalidEmail = 'email must be a valid email';
exports.passwordTooShort = 'password must be at least 3 characters';
exports.passwordValidation = yup
    .string()
    .min(3, exports.passwordTooShort)
    .max(255)
    .required();
exports.userValidationSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, exports.emailTooShort)
        .max(255)
        .email(exports.invalidEmail)
        .required(),
    password: exports.passwordValidation,
});
//# sourceMappingURL=user.js.map