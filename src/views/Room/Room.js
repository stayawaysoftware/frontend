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
  const [hostId, setHostId] = useState(null);
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
        const room_data = json.room;

        if (json.type === "info") {
          setRoomData(room_data);
          setRoomName(room_data.name);
          setHostId(room_data.host_id);
          setUsers(room_data.users.names);
          setMinUsers(room_data.users.min);
          setMaxUsers(room_data.users.max);
        } else if (json.type === "join" || json.type === "leave") {
          setUsers(room_data.users.names);
        } else if (json.type === "start") {
          navigate(`/game/${roomId}`);
        }
      };

      websocket.onclose = (event) => {
        console.log("Websocket cerrado");
        navigate(`/`);
      };
    }
  }, [roomId, websocket]);

  //esta constante se encarga de enviar el mensaje de start al websocket
  const startGame = () => {
    if (websocket) {
      const messageData = JSON.stringify({
        type: "start",
        room_id: roomId,
        host_id: userid,
      });
      websocket.send(messageData);
      console.log("Mensaje enviado: ", messageData);
    }
  };

  const leaveRoom = () => {
    if (websocket) {
      const messageData = JSON.stringify({
        type: "leave",
      });
      websocket.send(messageData);
      console.log("Mensaje enviado: ", messageData);
      // navigate(`/`);
      // se navega en el onclose
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
                  userid !== hostId ||
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
            {websocket && <Chat inGame={false} />}
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
