export interface IUser {
  uid: string | null;
  email: string | null;
  name: string | null;
  admin?: boolean;
  phone?: string | null;
  photo?: string | null;
}

export interface InitialState {
  user: IUser | null;
}
