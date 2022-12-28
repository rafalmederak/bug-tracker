import { Dialog } from "@mui/material";
import { SimpleDialogProps } from "typescript/interfaces/MUI.interfaces";

export const SimpleDialog = ({
  text,
  handleClose,
  simpleDialogOpen,
}: SimpleDialogProps) => {
  return (
    <Dialog
      fullWidth={true}
      onClose={handleClose}
      open={simpleDialogOpen}
      className="user-detail__dialog-container"
    >
      <p>{text}</p>
    </Dialog>
  );
};
