import * as Yup from "yup";
export const submitValidation = Yup.object().shape({
  email: Yup.string().email("Must be provided real email"),
  password: Yup.string().min(8, "Min length of password must be 8 characters"),
});
export const emailDetailsSubmitValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Length of first name can't be less than 2 characters")
    .max(40, "Length of first name can't be more than 40 characters"),
  lastName: Yup.string()
    .min(2, "Min length of last name can't be less than 2 characters")
    .max(40, "Length of last name can't be more than 40 characters"),
});
export const forgotPasswordEmailValidation = Yup.object().shape({
  email: Yup.string().email("Must be provided real email"),
});
export const resetPasswordValidation = Yup.object().shape({
  password: Yup.string().min(8, "Min length of password must be 8 characters"),
});
