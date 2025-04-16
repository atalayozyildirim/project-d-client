import React from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import api from "../../util/api";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const LoginRequest = async (email, password) => {
    const response = await (
      await api()
    ).post("/auth/login", {
      email,
      password,
    });
    return response.data;
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ email, password }) => LoginRequest(email, password),
    mutationKey: ["login"],
    onError: (error) => {
      if (error.response && error.response.data) {
        error.response?.data.errors.forEach((err) => {
          toast.error(`${err.msg} (${err.path})`);
        });
      } else if (error.response.message) {
        toast.error("Invalid credentials");
      }
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.user.token);
      navigate(data.redirect);
      queryClient.setQueryData(["user"], data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("Please fill in all fields");
      return;
    }
    mutation.mutate({ email, password });
  };
  return (
    <>
      <ToastContainer />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          height: "100vh",
          width: "100vw",
        }}
      >
        <h1 className="text-4xl font-bold text-center text-white">
          Login to CRM
        </h1>
        <Box
          component="form"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            gap: 10,
            width: "500px",
            margin: "0 auto",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <TextField
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              backgroundColor: "#141517",
              input: { color: "white" },
              label: { color: "white" },
            }}
            style={{
              backgroundColor: "#141517",
              color: "white",
            }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              backgroundColor: "#141517",
              input: { color: "white" },
              label: { color: "white" },
            }}
            style={{
              backgroundColor: "#141517",
              color: "white",
              outline: "none",
              border: "none",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={mutation.isPending && false}
            sx={{
              backgroundColor: "#141517",
              "&:hover": {
                backgroundColor: "#141517",
                color: "white",
              },
            }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Box>
      </div>
    </>
  );
};

export default LoginForm;
