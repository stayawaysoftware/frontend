import React, {useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { TextField } from "@mui/material";
import List from "@mui/material/List";
import PeopleIcon from '@mui/icons-material/People';

import { useParams } from "react-router-dom";

import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function GetRoomName() {
  //until the api is defined it will return a simple name with the roomId
  return "Room " + useParams().roomId;
}

function GetPlayers() {
  //function that returns the list of players in the room
  //generate a generic list of players
  const players = ["Player1", "The Cosa", "amongu", "xX_gamer_Xx", "Player5", "Player6", "Player7", "Player8", "Player9", "Player10", "Player11", "Player12"];
  return players;
}

function GetMaxPlayers() {
  //until the api is defined it will return a simple number
  return 12;
}

const Room = () => {
  const { roomId } = useParams();

  //get room data from the server
  const [roomData, setRoomData] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    //get room data from the server
    axios.get(`http://0.0.0.0:8000/rooms/${roomId}/users`)
      .then((response) => {
        setRoomData(response.data);
        setRoomName(response.data.name);
        setPlayers(response.data.users);
      });
  }
  , []);
  
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
        <Paper square={false} style={{ height: '450px', textAlign: 'center', padding: '16px' }}>
          chat
        </Paper>
      </Grid>

      {/* Cuarto elemento, cant de jugadores n/N y una lista de jugadores con emoji de people*/}
      <Grid item xs={4}>
        <Paper square={false} style={{ height: '450px', textAlign: 'center', padding: '16px' }}>
          <Stack>
            <Stack direction="row">
              {/* cant de jugadores */}
              <PeopleIcon style={{ fontSize: 20, marginRight: '8px'}}/>
              <strong> Players {GetPlayers().length}/{GetMaxPlayers()}</strong>
            </Stack>
            <List>
              {GetPlayers().map((player, index) => (
                <Item key={index}>{player}</Item>
              ))}
            </List>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Room;
