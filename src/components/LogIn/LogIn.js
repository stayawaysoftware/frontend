import React, { useState, useContext } from "react";
import { UserContext } from "../../UserContext";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import CasinoIcon from "@mui/icons-material/Casino";
import Button from "@mui/material/Button";

const defaultTheme = createTheme();

const centerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "90vh",
};

export default function LogIn() {
  const [username, setUsername] = useState(undefined);

  const { setUser } = useContext(UserContext);

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setUser(username);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={centerStyle}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <SmartToyIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Stay Away!
            </Typography>
          </Box>
        </Container>

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
