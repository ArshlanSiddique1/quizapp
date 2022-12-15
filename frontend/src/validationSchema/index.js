import * as Yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
//min 5 character, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const signInSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid Email").required("Required"),
    password: Yup.string().min(6).matches(passwordRules, { message: "Password Does not Match !" }).required("Required")
});