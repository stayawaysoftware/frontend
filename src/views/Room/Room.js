import React from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { TextField } from "@mui/material";
import List from "@mui/material/List";

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

function GetPlayers() {
  //function that returns the list of players in the room
  //generate a generic list of players
  const players = ["Player1", "The Cosa", "amongu", "xX_gamer_Xx", "Player5"];
  return players;
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

      {/* Cuarto elemento, es una lista de jugadores */}
      <Grid item xs={4}>
        <Paper square={false} style={{ height: '200px', textAlign: 'center', padding: '16px' }}>
          <List>
            {GetPlayers().map((player, index) => (
              <Item key={index}>{player}</Item>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Room;
