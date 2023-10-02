import React, {useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import image from '../Background/Hex.svg';

import { TextField } from "@mui/material";
import List from "@mui/material/List";
import PeopleIcon from '@mui/icons-material/People';

import { useParams } from "react-router-dom";

import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Room = () => {
  const { roomId } = useParams();

  //get room data from the server
  const [roomData, setRoomData] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //get room data from the server
    const getRoomData = async () => {
      const response = await axios.get(`http://localhost:8000/rooms/${roomId}`)
      setRoomData(response.data);
      setRoomName(response.data.name);
      setUsers(response.data.usernames);
      console.log("users es", users);
    };
    getRoomData();

    const interval = setInterval(getRoomData, 2000);

    return () => clearInterval(interval);
   }, [roomId]);
  
  

  return (
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
      <Grid container spacing={2}>
        {/* First element, Room Name */}
        <Grid item xs={8}>
          <Paper square={false} style={{ height: '100px', textAlign: 'center', padding: '16px' }}>
            <h1>{roomName}</h1>
          </Paper>
        </Grid>

        {/* Second element, boton de iniciar partida, centrado en el paper */} 
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
                <strong> Players {users.length}/{12}</strong>
              </Stack>
              <List>
                {users.map((users, index) => (
                  <Item key={index}>{users}</Item>
                ))}
              </List>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Room;
