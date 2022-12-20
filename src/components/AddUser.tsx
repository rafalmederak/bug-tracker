import UserDetailLayout from "../layouts/UserDetailLayout";
import { IUserDetailProps } from "typescript/interfaces/UserDetail.interfaces";
import { FormData } from "typescript/types/UsersForm.types";
import { functions } from "../firebase/firebase";
import { httpsCallable } from "firebase/functions";

const AddUser = ({ setUserDetail }: IUserDetailProps) => {
  const formValues = {
    name: "",
    email: "",
    photo: "",
    phone: "",
    role: "user",
  };

  const onSubmit = async (data: FormData) => {
    const createUser = httpsCallable(functions, "createUser");
    const addAdminRole = httpsCallable(functions, "addAdminRole");

    try {
      console.log(data);
      createUser({
        email: data.email,
        phone: data.phone || null,
        photo: data.photo || null,
        name: data.name,
        password: data.password,
      })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });

      if (data?.role === "admin") {
        addAdminRole({ email: data.email }).then((result) => {
          console.log(result);
        });
      }
    } catch (error) {
      console.log(error);
    }

    console.log("test add user");
  };

  return (
    <UserDetailLayout
      setUserDetail={setUserDetail}
      formValues={formValues}
      onSubmit={onSubmit}
    />
  );
};

export default AddUser;
