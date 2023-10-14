import React, { useEffect, useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import image from "../Background/Hex.svg";

import { TextField } from "@mui/material";
import List from "@mui/material/List";
import PeopleIcon from "@mui/icons-material/People";

import { useParams, useNavigate, Form } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { Chat } from "../../components/Chat/Chat";
import { API_ENDPOINT_ROOM_START } from "../../utils/ApiTypes";
import { useWebSocket } from "../../contexts/WebsocketContext";

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

  //Room data
  const [roomData, setRoomData] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [users, setUsers] = useState([]);
  const [minUsers, setMinUsers] = useState(null);
  const [maxUsers, setMaxUsers] = useState(null);

  // esto es una manera mas limpia de llamar el contexto
  const { websocket } = useWebSocket();
  const { createWebSocket } = useWebSocket();

  useEffect(() => {
    // esto se ejecuta cuando se monta el componente y crea el websocket
    createWebSocket(roomId);
  }, []);

  useEffect(() => {
    if (websocket) {
      websocket.onmessage = (event) => {
        const json = JSON.parse(event.data);
        console.log("Mensaje recibido: ", json);

        if (
          json.type === "info" ||
          json.type === "join" ||
          json.type === "leave"
        ) {
          setRoomData(json.room);
          setRoomName(json.room.name);
          setUsers(json.room.users.names);
          setMinUsers(json.room.users.min);
          setMaxUsers(json.room.users.max);
        } else if (json.type === "start") {
          navigate(`/game/${roomId}`);
        }
      };
    }
  }, [roomId, websocket]);

  const startGame = () => {
    if (websocket) {
      const messageData = JSON.stringify({
        type: "start",
        // sender: userid,
      });
      websocket.send(messageData);
      console.log("Mensaje enviado: ", messageData);
      // navigate(`/game/${roomId}`);
    }
  };

  // const leaveRoom = async () => {
  //   const leaveParameters = JSON.stringify({
  //     room_id: roomId,
  //     user_id: userid,
  //   });
  //   const url = API_ENDPOINT_ROOM_LEAVE;

  //   try {
  //     const response = await axios.put(url, leaveParameters);
  //     console.log(response);
  //     navigate(`/`);
  //   } catch (error) {
  //     if (error.response.status === 500) {
  //       alert(error.response.data.message);
  //     }
  //     console.log(error);
  //   }
  // };

  const leaveRoom = () => {
    if (websocket) {
      const messageData = JSON.stringify({
        type: "leave",
        sender: userid,
      });
      websocket.send(messageData);
      console.log("Mensaje enviado: ", messageData);
      // navigate(`/game/${roomId}`);
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
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Grid container spacing={2}>
        {/* First element, Room Name */}
        <Grid item xs={8}>
          <Paper
            square={false}
            style={{
              height: "100px",
              textAlign: "center",
              padding: "16px",
              background: "rgba(255,255,255,0.7)",
            }}
          >
            <h1 style={{ color: "rgba(30,40,30,1)" }}>{roomName}</h1>
          </Paper>
        </Grid>

        {/* Second element, boton de iniciar partida, centrado en el paper */}
        <Grid item xs={4}>
          <Paper
            square={false}
            style={{
              height: "100px",
              textAlign: "center",
              padding: "16px",
              background: "rgba(255,255,255,0.0)",
            }}
          >
            {!!roomData ? (
              <Button
                variant="contained"
                size="small"
                color="success"
                disabled={
                  userid !== roomData.host_id ||
                  users.length < minUsers ||
                  users.length > maxUsers
                }
                onClick={startGame}
              >
                <h2>Empezar partida</h2>
              </Button>
            ) : null}
          </Paper>
        </Grid>

        {/* Tercer elemento */}
        <Grid item xs={8}>
          <Paper
            square={false}
            style={{
              height: "450px",
              textAlign: "center",
              padding: "16px",
              background: "rgba(255,255,255,0.7)",
            }}
          >
            {websocket && <Chat />}
          </Paper>
        </Grid>

        {/* Cuarto elemento, cant de jugadores n/N y una lista de jugadores con emoji de people*/}
        <Grid item xs={4}>
          <Paper
            square={false}
            style={{
              height: "450px",
              textAlign: "center",
              padding: "16px",
              background: "rgba(255,255,255,0.7)",
            }}
          >
            <Stack>
              <Stack direction="row">
                {/* cant de jugadores */}
                <PeopleIcon style={{ fontSize: 20, marginRight: "8px" }} />
                <strong>
                  {" "}
                  Jugadores {users.length}/{maxUsers}
                </strong>
              </Stack>
              <List>
                {users.map((users, index) => (
                  <Item key={index}>{users}</Item>
                ))}
              </List>
              {/* leave button */}
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={() => {
                  leaveRoom();
                }}
              >
                <h2>Salir</h2>
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Room;
