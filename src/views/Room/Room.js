import React, { useEffect, useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import image from '../Background/Hex.svg';

import { TextField } from "@mui/material";
import List from "@mui/material/List";
import PeopleIcon from "@mui/icons-material/People";

import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Room = () => {
  const { roomId } = useParams();
  const { userid } = useContext(UserContext);
  const navigate = useNavigate();

  //get room data from the server
  const [roomData, setRoomData] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //get room data from the server
    const getRoomData = async () => {
      const response = await axios.get(`http://localhost:8000/rooms/${roomId}`);
      setRoomData(response.data);
      setRoomName(response.data.name);
      setUsers(response.data.usernames);
      console.log("users es", response.data);
      if (response.data.in_game) {
        navigate(`/game/${roomId}`);
      }
    };
    getRoomData();

    const interval = setInterval(getRoomData, 2000);

    return () => clearInterval(interval);
  }, [roomId, navigate]);

  const startGame = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/rooms/${roomId}/start?host_id=${userid}`
      );
      console.log(response);
      navigate(`/game/${roomId}`);
    } catch (error) {
      if (error.response.status === 500) {
        alert(error.response.data.message);
      }
      console.log(error);
    }
  };

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
          <Paper
          square={false}
          style={{ height: "100px", textAlign: "center", padding: "16px" }}
        >
            <h1>{roomName}</h1>
          </Paper>
        </Grid>

      {/* Second element, boton de iniciar partida, centrado en el paper */}
      <Grid item xs={4}>
        <Paper
          square={false}
          style={{ height: "100px", textAlign: "center", padding: "16px" }}
        >
          {!!roomData ? (
            <Button
              variant="contained"
              color="success"
              size="large"
              disabled={
                userid !== roomData.host_id ||
                users.length < 4 ||
                users.length > 12
              }
              onClick={startGame}
            >
              <h2>Start game</h2>
            </Button>
          ) : null}
        </Paper>
      </Grid>

        {/* Tercer elemento */}
        <Grid item xs={8}>
          <Paper
          square={false}
          style={{ height: "450px", textAlign: "center", padding: "16px" }}
        >
            chat
          </Paper>
        </Grid>

        {/* Cuarto elemento, cant de jugadores n/N y una lista de jugadores con emoji de people*/}
        <Grid item xs={4}>
          <Paper
          square={false}
          style={{ height: "450px", textAlign: "center", padding: "16px" }}
        >
            <Stack>
              <Stack direction="row">
                {/* cant de jugadores */}
                <PeopleIcon style={{ fontSize: 20, marginRight: "8px" }} />
                <strong>
                {" "}
                Players {users.length}/{12}
              </strong>
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
