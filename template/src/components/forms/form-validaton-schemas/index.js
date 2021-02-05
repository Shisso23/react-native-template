import * as Yup from 'yup';

export const emailSchema = Yup.string().email('Invalid Email').trim().required('Email is required');
export const passwordSchema = Yup.string().required('Password is required');

export const registerPasswordSchema = (edit) =>
  !edit
    ? Yup.string()
        .min(6, 'Minimum of 6 characters needed for password')
        .required('Password is required')
    : Yup.string().notRequired();

export const confirmPasswordSchema = (edit) =>
  !edit
    ? Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required')
    : Yup.string().notRequired();

export const termsAndConditionsSchema = (edit) =>
  !edit ? Yup.bool().oneOf([true]) : Yup.string().notRequired();
