// import * as React from "react";
import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";
import CreateRoomDialog from "../LobbyConfig/LobbyConfigDialog";
import axios from "axios";
import { Alert } from "@mui/material";

import { API_ENDPOINT_ROOM_JOIN } from "../../utils/ApiTypes";

export default function ButtonList({ joinRoom }) {
  const [isCreateRoomDialogOpen, setCreateRoomDialogOpen] = useState(false);
  const { roomid } = useContext(UserContext);
  const navigate = useNavigate();
  const { userid } = React.useContext(UserContext);
  const [error, setError] = useState(null);

  const handleCreateRoomClick = () => {
    setCreateRoomDialogOpen(true);
  };

  const handleCloseCreateRoomDialog = () => {
    setCreateRoomDialogOpen(false);
  };

  const handleJoinRoom = async () => {
    const url = API_ENDPOINT_ROOM_JOIN;
    let parameters = new FormData();
    parameters.append("room_id", roomid);
    parameters.append("user_id", userid);

    await axios
      .put(url, parameters)
      .then((response) => {
        console.log("Solicitud POST exitosa", response.data);
        navigate("/room/" + roomid);
      })
      .catch((error) => {
        console.error("Error en la solicitud POST", error);
        setError(error.response.data.detail);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={8} md={10}>
        <List>
          <ListItem>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              style={{
                width: "180px",
              }}
              color="success"
            >
              Actualizar
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              style={{
                width: "180px",
              }}
              color="success"
              onClick={handleCreateRoomClick}
            >
              Crear Sala
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              disabled={roomid === null}
              startIcon={<LoginIcon />}
              style={{
                width: "180px",
              }}
              color="success"
              onClick={handleJoinRoom}
            >
              Unirse
            </Button>
          </ListItem>
        </List>
      </Grid>
      <CreateRoomDialog
        open={isCreateRoomDialogOpen}
        onClose={handleCloseCreateRoomDialog}
      />
      {!!error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
    </Grid>
  );
}
