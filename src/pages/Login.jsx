import React from "react";
import LoginForm from "../components/Form/LoginForm";

const Login = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          backgroundColor: "#171c1e",
        }}
      >
        <LoginForm />
      </div>
    </>
  );
};
export default Login;
