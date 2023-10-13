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

import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { Chat } from "../../components/Chat/Chat";
import { BASE_URL } from "../../utils/ApiTypes";

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

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    //get room data from the server
    const ws = new WebSocket(`${BASE_URL}/${roomId}/${userid}`);

    setSocket(ws);

    ws.onopen = () => {
      console.log(`Se inició el websocket de ${userid}`);
    };

    ws.onmessage = (event) => {
      const json = JSON.parse(event.data);
      console.log("Mensaje: ", json);

      if (json.type == "info") {
        setRoomData(json.room);
        setRoomName(json.room.name);
        setUsers(json.room.users.names);
      } else if (json.type == "join") {
        setRoomData(json.room);
        setRoomName(json.room.name);
        setUsers(json.room.users.names);
      }
    };

    ws.onclose = () => {
      console.log("Se cerró el socket");
    };

    return () => {
      ws.close();
    };
  }, [roomId]);

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
                  users.length < 4 ||
                  users.length > 12
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
            {socket && <Chat socket={socket} />}
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
                  Jugadores {users.length}/{12}
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
