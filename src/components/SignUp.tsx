import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import AuthForm from "./SignUp/AuthForm";
import { auth, db } from "../db/firebase";
import { doc, setDoc } from "firebase/firestore";
import ErrorMessage from "./ErrorMessage";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SignUp = () => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (email: string, password: string, mode: string) => {
    if (email && password) {
      if (mode === "register") {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential: any) => {
            const user = userCredential.user;
            return user;
          })
          .then((newUser: any) => {
            console.log(newUser.email);
            const userRef = doc(db, "users", `${newUser.email}`);
            setDoc(
              userRef,
              {
                email: newUser.email,
              },
              { merge: true }
            );
          })
          .catch((error: any) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // console.log(errorMessage);
            setError("Има регистриран потребител с този имейл в системата.");
          });
      } else {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential: any) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            // ...
          })
          .catch((error: any) => {
            setError("Има проблем с влизането в системата.");
          });
      }
    }
  };

  return (
    <div>
      {error ? (
        <ErrorMessage errorMessage={error} executable={() => setError("")} />
      ) : null}
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          color: "white",
          fontSize: 15,
          border: "1px solid white",
          marginLeft: 10,
          "&:hover": {
            backgroundColor: "#4e9cea",
          },
        }}
      >
        Влез
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <AuthForm onSubmit={onSubmit} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default SignUp;
