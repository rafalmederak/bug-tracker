import { SubmitHandler } from "react-hook-form";
import { IUser } from "./UserSlice.interfaces";
import { FormData } from "typescript/types/UsersForm.types";

export interface IUserDetailProps {
  setUserDetail: React.Dispatch<React.SetStateAction<string>>;
  activeUser?: IUser;
}

export interface IUserDetailLayoutProps extends IUserDetailProps {
  formValues?: {};
  onSubmit: SubmitHandler<FormData>;
}
