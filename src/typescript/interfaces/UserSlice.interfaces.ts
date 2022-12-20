export interface IUser {
  uid: string;
  email: string;
  name: string;
  admin?: boolean;
  phone?: string;
  photo?: string;
}

export interface IFirebaseUser {
  uid: string;
  email: string;
  displayName: string;
  customClaims: {
    admin?: boolean;
  };
  phoneNumber?: string;
  photoURL?: string;
}

export interface InitialState {
  user: IUser | null;
}
