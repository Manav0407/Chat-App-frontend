import * as Yup from "yup";

export const RegisterSchema = Yup.object({
    
    username : Yup.string().min(2).max(25).required("Please enter your username."),
    email : Yup.string().email().required("Please enter your email."),
    password : Yup.string().min(6).required("Password must be atleast 6 characters."),
});

export const LoginSchema = Yup.object({
    email : Yup.string().email().required("Please enter your email."),
    password : Yup.string().min(6).required("Password must be atleast 6 characters."), 
});
