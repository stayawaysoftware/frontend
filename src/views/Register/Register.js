import LogIn from "../../components/LogIn/LogIn";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import image from '../Background/fotito.svg';

const Register = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box sx={{ flexGrow: 1, maxWidth: 800 }}>
          <Grid container spacing={20}>
            <Grid item xs={6} md={20}>
              <LogIn/>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Register;