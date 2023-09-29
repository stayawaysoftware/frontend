import Hand from "../../components/GameComps/Hand";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Game = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ flexGrow: 1, maxWidth: 800 }}>
          <Grid container spacing={20}>
            <Grid item xs={6} md={20}>
              <Hand/>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Game;