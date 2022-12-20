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
    const addAdminRole = httpsCallable(functions, "addAdminRole");

    try {
      console.log(data);
      updateUser({
        uid: activeUser?.uid,
        email: data.email,
        phone: data.phone || null,
        photo: data.photo || null,
        name: data.name,
      }).then((result) => {
        console.log(result);
      });

      if (!activeUser?.admin && data?.role === "admin") {
        addAdminRole({ email: data.email }).then((result) => {
          console.log(result);
        });
      }
    } catch (error) {
      console.log(error);
    }

    console.log("test2");
  };

  return (
    <UserDetailLayout
      setUserDetail={setUserDetail}
      activeUser={activeUser}
      formValues={formValues}
      onSubmit={onSubmit}
    />
  );
};

export default EditUser;
