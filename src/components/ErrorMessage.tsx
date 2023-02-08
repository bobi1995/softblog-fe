import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorMessage = ({
  errorMessage,
  executable,
}: {
  errorMessage: string | undefined;
  executable?: any;
}) => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    if (errorMessage === "Нямаш права за тази сесия!") {
      navigate("/login");
    }
    if (executable) {
      executable();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Възникна грешка"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Затвори
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ErrorMessage;
