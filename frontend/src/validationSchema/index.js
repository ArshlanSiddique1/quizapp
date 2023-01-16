import * as Yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
//min 5 character, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const signInSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid Email").required("Required"),
    password: Yup.string().min(6).matches(passwordRules, { message: "Password Does not Match !" }).required("Required")
});

export const sectorInSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
});

export const categoryInSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
});

export const gradeInSchema = Yup.object().shape({
    gradeName: Yup.string().required("Required"),
});

export const sectionInSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    sector_id: Yup.string().required("Required"),
    category_id: Yup.string().required("Required"),
    grade_id: Yup.string().required("Required"),
    subject_id: Yup.string().required("Required"),

});


export const questionInSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    sector_id: Yup.string().required("Required"),
    category_id: Yup.string().required("Required"),
    grade_id: Yup.string().required("Required"),
    subject_id: Yup.string().required("Required"),
    section_id: Yup.string().required("Required"),

});

export const subjectInSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    sector_id: Yup.string().required("Required"),
    category_id: Yup.string().required("Required"),
    grade_id: Yup.string().required("Required"),

});