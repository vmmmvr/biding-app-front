import { useMutation } from "@tanstack/react-query";
import { userSignin } from "./api";
import { UserSignIn } from "@/interfaces/User";



export const useUserSignInMutation = () => {
    return useMutation({
      mutationFn: (data: UserSignIn) => userSignin(data),
      mutationKey: ["userSignin"],
      onSuccess: (data) => {
        console.log("userSignin successful", data);
      },
      onError: (error: any) => {
        console.error('userSignin failed:', error.response?.data);
      },
    });
  };
