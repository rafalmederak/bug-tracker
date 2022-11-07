import { User } from "firebase/auth";

export interface IUserAuth extends User {
    admin?: boolean,
  }