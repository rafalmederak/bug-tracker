import UserDetailLayout from "../layouts/UserDetailLayout";
import { IUserDetailProps } from "typescript/interfaces/UserDetail.interfaces";
import { functions } from "../firebase/firebase";
import { httpsCallable } from "firebase/functions";
import { FormData } from "typescript/types/UsersForm.types";
import { useState } from "react";
import { SimpleDialog } from "components/SimpleDialog";

const EditUser = ({
  setUserDetail,
  activeUser,
  setActiveUser,
}: IUserDetailProps) => {
  const [simpleDialogOpen, simpleDialogSetOpen] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [formError, setFormError] = useState("");

  const handleOpen = () => {
    simpleDialogSetOpen(true);
  };

  const handleClose = () => {
    simpleDialogSetOpen(false);
  };

  const formValues = {
    name: activeUser?.name,
    email: activeUser?.email,
    photo: activeUser?.photo,
    phone: activeUser?.phone,
    role: activeUser?.admin ? "admin" : "user",
  };

  const onSubmit = async (data: FormData) => {
    try {
      setDialogText("Updating user...");
      handleOpen();
      const updateUser = httpsCallable(functions, "updateUser");
      await updateUser({
        uid: activeUser?.uid,
        email: data.email,
        phone: data.phone || null,
        photo: data.photo || null,
        name: data.name,
        admin: data?.role === "admin" && true,
      });
      setFormError("");
      setDialogText("The user has been updated.");
      setActiveUser?.({
        uid: activeUser?.uid!,
        email: data.email,
        phone: data?.phone,
        photo: data?.photo,
        name: data.name,
        admin: data?.role === "admin" && true,
      });
    } catch (error) {
      handleClose();
      const { details } = JSON.parse(JSON.stringify(error));
      console.log(details.message);
      setFormError(details.message);
      return;
    }
  };

  const removeUser = async () => {
    const uid = activeUser?.uid;

    try {
      setDialogText("Removing user...");
      handleOpen();
      const deleteUser = httpsCallable(functions, "deleteUser");
      await deleteUser({ uid });
      setFormError("");
      setUserDetail("");
    } catch (error) {
      handleClose();
      const { details } = JSON.parse(JSON.stringify(error));
      console.log(details.message);
      setFormError(details.message);
      return;
    }
  };

  return (
    <>
      <UserDetailLayout
        setUserDetail={setUserDetail}
        activeUser={activeUser}
        formValues={formValues}
        onSubmit={onSubmit}
        removeUser={removeUser}
        formError={formError}
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
