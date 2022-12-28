import UserDetailLayout from "../layouts/UserDetailLayout";
import { IUserDetailProps } from "typescript/interfaces/UserDetail.interfaces";
import { FormData } from "typescript/types/UsersForm.types";
import { functions } from "../firebase/firebase";
import { httpsCallable } from "firebase/functions";
import { useState } from "react";
import { SimpleDialog } from "components/SimpleDialog";

const AddUser = ({ setUserDetail }: IUserDetailProps) => {
  const [simpleDialogOpen, simpleDialogSetOpen] = useState(false);
  const [dialogText, setDialogText] = useState("");

  const handleOpen = () => {
    simpleDialogSetOpen(true);
  };

  const handleClose = () => {
    simpleDialogSetOpen(false);
    setUserDetail("");
  };

  const formValues = {
    name: "",
    email: "",
    photo: "",
    phone: "",
    role: "user",
  };

  const onSubmit = (data: FormData) => {
    setDialogText("Adding user...");
    handleOpen();
    const createUser = httpsCallable(functions, "createUser");

    console.log(data);
    createUser({
      email: data.email,
      phone: data.phone || null,
      photo: data.photo || null,
      name: data.name,
      password: data.password,
      admin: data?.role === "admin" && true,
    })
      .then((result) => {
        console.log(result);
        setDialogText("The user has been added.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <UserDetailLayout
        setUserDetail={setUserDetail}
        formValues={formValues}
        onSubmit={onSubmit}
      />
      <SimpleDialog
        open={simpleDialogOpen}
        text={dialogText}
        simpleDialogOpen={simpleDialogOpen}
        handleClose={handleClose}
      />
    </>
  );
};

export default AddUser;
