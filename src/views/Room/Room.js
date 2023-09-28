import React from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { TextField } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function GetRoomName() {
  //until the api is defined it will return a simple name
  return "Room's name";
}

const Room = () => {
  return (
    <Grid container spacing={2}>
      {/* Primer elemento (más corto) */}
      <Grid item xs={8}>
        <Paper square={false} style={{ height: '100px', textAlign: 'center', padding: '16px' }}>
          <h1>{GetRoomName()}</h1>
        </Paper>
      </Grid>

      {/* Segundo elemento (más corto), boton de iniciar partida, centrado en el paper */} 
      <Grid item xs={4}>
        <Paper square={false} style={{ height: '100px', textAlign: 'center', padding: '16px' }}>
          <Button variant="contained" color="success" size="large">
            <h2>Start game</h2>
          </Button>    
        </Paper>
      </Grid>

      {/* Tercer elemento */}
      <Grid item xs={8}>
        <Paper square={false} style={{ height: '200px', textAlign: 'center', padding: '16px' }}>
          chat
        </Paper>
      </Grid>

      {/* Cuarto elemento */}
      <Grid item xs={4}>
        <Paper square={false} style={{ height: '200px', textAlign: 'center', padding: '16px' }}>
          <Stack spacing={2}>
            players in game
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Room;
