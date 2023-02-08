import React from "react";
import styled from "styled-components";
import GoogleIcon from "@mui/icons-material/Google";
const GoogleSignUpButton = styled.button`
  background-color: white;
  border: 1px solid #db4437;
  border-radius: 4px;
  color: #db4437;
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;

const GoogleBtn = () => {
  return (
    <GoogleSignUpButton>
      <GoogleIcon />
      Sign Up with Google
    </GoogleSignUpButton>
  );
};

export default GoogleBtn;
