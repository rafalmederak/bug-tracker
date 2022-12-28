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
  const [formError, setFormError] = useState("");

  const handleOpen = () => {
    simpleDialogSetOpen(true);
  };

  const handleClose = () => {
    simpleDialogSetOpen(false);
  };

  const formValues = {
    name: "",
    email: "",
    photo: "",
    phone: "",
    role: "user",
  };

  const onSubmit = async (data: FormData) => {
    try {
      setDialogText("Adding user...");
      handleOpen();
      const createUser = httpsCallable(functions, "createUser");
      await createUser({
        email: data.email,
        phone: data.phone || null,
        photo: data.photo || null,
        name: data.name,
        password: data.password,
        admin: data?.role === "admin" && true,
      });
      setFormError("");
      setDialogText("The user has been added.");
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
        formValues={formValues}
        onSubmit={onSubmit}
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

export default AddUser;
