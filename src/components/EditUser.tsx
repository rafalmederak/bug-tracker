import UserDetailLayout from "../layouts/UserDetailLayout";
import { IUserDetailProps } from "typescript/interfaces/UserDetail.interfaces";
import { functions } from "../firebase/firebase";
import { httpsCallable } from "firebase/functions";
import { FormData } from "typescript/types/UsersForm.types";

const EditUser = ({ setUserDetail, activeUser }: IUserDetailProps) => {
  const formValues = {
    name: activeUser?.name,
    email: activeUser?.email,
    photo: activeUser?.photo,
    phone: activeUser?.phone,
    role: activeUser?.admin ? "admin" : "user",
  };

  const onSubmit = async (data: FormData) => {
    const updateUser = httpsCallable(functions, "updateUser");

    try {
      console.log(data);
      updateUser({
        uid: activeUser?.uid,
        email: data.email,
        phone: data.phone || null,
        photo: data.photo || null,
        name: data.name,
        admin: data?.role === "admin" && true,
      }).then((result) => {
        console.log(result);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = httpsCallable(functions, "deleteUser");

  const removeUser = () => {
    const uid = activeUser?.uid;
    try {
      deleteUser({ uid }).then((result) => {
        console.log(result);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserDetailLayout
      setUserDetail={setUserDetail}
      activeUser={activeUser}
      formValues={formValues}
      onSubmit={onSubmit}
      removeUser={removeUser}
    />
  );
};

export default EditUser;
