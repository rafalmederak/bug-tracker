import * as yup from "yup";

const firebasePhoneReg = /^[+][0-9]{11}$/;

export const usersSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, "The name can not have any special characters.")
    .required("Name is required")
    .max(50),
  photo: yup.string().nullable(true),
  phone: yup
    .string()
    .transform((value) => (!value ? null : value))
    .matches(firebasePhoneReg, "Correct phone pattern: +00123456789.")
    .nullable(true),
  role: yup.string().max(50),
  email: yup
    .string()
    .email("Incorrect email address.")
    .required("Email address is required."),
  password: yup
    .string()
    .min(8, "The password has to contain at least 8 characters.")
    .max(32, "The password can contain maximum 32 characters."),
});
