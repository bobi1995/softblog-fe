import React, { useState } from "react";
import styled from "styled-components";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../db/firebase";
import ErrorMessage from "../ErrorMessage";
import { doc, setDoc } from "firebase/firestore";

interface Props {
  onSubmit: (email: string, password: string, mode: string) => void;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
`;

const StyledInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 300px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const StyledButton = styled.button`
  margin: 20px 0;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 180px;
`;

const StyledButton2 = styled.button`
  margin: 20px 0;
  padding: 10px 20px;
  background-color: #1976d2;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 180px;
`;

const AuthForm: React.FC<Props> = ({ onSubmit }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const userRef = doc(db, "users", `${result.user.email}`);
      setDoc(
        userRef,
        {
          email: result.user.email,
          photoURL: result.user.photoURL,
          name: result.user.displayName,
        },
        { merge: true }
      );
    } catch (error) {
      return (
        <ErrorMessage errorMessage="Възникна проблем с влизането в профила. Моля опитайте отново" />
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, mode);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>{mode === "register" ? "Регистрирай се" : "Добре дошъл"}</h2>
      <GoogleButton
        label="Влез с Google"
        onClick={GoogleLogin}
        style={{ marginBottom: 10 }}
      />
      <StyledInput
        type="email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        placeholder="Имейл"
      />
      <StyledInput
        type="password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        placeholder="Парола"
      />
      {mode === "register" && (
        <StyledInput
          type="password"
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
          placeholder="Потвърди парола"
        />
      )}
      <StyledButton type="submit">
        {mode === "register" ? "Регистрирай" : "Влез"}
      </StyledButton>
      <StyledButton2
        onClick={() =>
          mode === "register" ? setMode("login") : setMode("register")
        }
      >
        {mode === "register" ? "Вече имам акаунт" : "Създай акаунт"}
      </StyledButton2>
    </StyledForm>
  );
};

export default AuthForm;
