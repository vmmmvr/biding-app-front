import * as Yup from "yup";



export const UserSignInSchema = Yup.object({
  name: Yup.string()
  .min(4, "Name must be at least 2 characters long")
  .required("Required is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Required  is Required"),
});
