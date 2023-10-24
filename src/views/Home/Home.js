import GameList from "../../components/GameList/GameList";
import ButtonList from "../../components/ButtonList/ButtonList";
import image from "../Background/Hex2324.svg";

import React, { useState } from "react";
import { Box, Grid, Alert } from "@mui/material";

const Home = () => {
  const [error, setError] = useState(null);
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <h1 style={{ color: "rgba(255,255,255,1)" }}>Lista de salas</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ flexGrow: 1, maxWidth: 800 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
              <GameList setError={setError} />
            </Grid>
            <Grid item xs={6} md={4}>
              <ButtonList setError={setError} />
            </Grid>
          </Grid>
        </Box>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!!error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Home;
