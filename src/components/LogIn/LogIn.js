import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import CasinoIcon from "@mui/icons-material/Casino";
import Button from "@mui/material/Button";
import axios from "axios";

const defaultTheme = createTheme();

const centerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "90vh",
};

export default function LogIn() {
  const [username, setUserNameLocal] = useState(undefined);

  const { setUserName, setUserId } = useContext(UserContext);

  const usernameHandler = (e) => {
    setUserNameLocal(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/users";
    //build de url with the params
    const params = "?username=" + username;
    const urlFinal = url + params;

    await axios
      .post(urlFinal)
      .then((response) => {
        console.log("Solicitud POST exitosa", response.data);
        setUserId(response.data.id);
        setUserName(username);
      })
      .catch((error) => {
        console.error("Error en la solicitud POST", error);
        if (error.response.status === 500) {
          alert(error.response.data.detail);
        }
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={centerStyle}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="random name">
                <CasinoIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Username"
                onChange={usernameHandler}
                inputProps={{ "aria-label": "username" }}
              />
            </Paper>
            <Button
              type="submit"
              onClick={loginHandler}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Play
            </Button>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
