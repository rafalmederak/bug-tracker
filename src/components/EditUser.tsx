import UserDetailLayout from "../layouts/UserDetailLayout";
import { IUserDetailProps } from "typescript/interfaces/UserDetail.interfaces";
import { functions } from "../firebase/firebase";
import { httpsCallable } from "firebase/functions";
import { FormData } from "typescript/types/UsersForm.types";
import { useState } from "react";
import { SimpleDialog } from "components/SimpleDialog";

const EditUser = ({ setUserDetail, activeUser }: IUserDetailProps) => {
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
    name: activeUser?.name,
    email: activeUser?.email,
    photo: activeUser?.photo,
    phone: activeUser?.phone,
    role: activeUser?.admin ? "admin" : "user",
  };

  const onSubmit = (data: FormData) => {
    setDialogText("Updating user...");
    handleOpen();
    const updateUser = httpsCallable(functions, "updateUser");

    console.log(data);
    updateUser({
      uid: activeUser?.uid,
      email: data.email,
      phone: data.phone || null,
      photo: data.photo || null,
      name: data.name,
      admin: data?.role === "admin" && true,
    })
      .then((result) => {
        console.log(result);
        setDialogText("The user has been updated.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = httpsCallable(functions, "deleteUser");

  const removeUser = () => {
    setDialogText("Removing user...");
    handleOpen();
    const uid = activeUser?.uid;

    deleteUser({ uid })
      .then((result) => {
        console.log(result);
        setDialogText("The user has been removed.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <UserDetailLayout
        setUserDetail={setUserDetail}
        activeUser={activeUser}
        formValues={formValues}
        onSubmit={onSubmit}
        removeUser={removeUser}
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

export default EditUser;
