// import * as React from "react";
import React, { useState } from 'react';
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";

import CreateRoomDialog from '../LobbyConfig/LobbyConfigDialog';

export default function GameList() {
  const [isCreateRoomDialogOpen, setCreateRoomDialogOpen] = useState(false);

  const handleCreateRoomClick = () => {
    setCreateRoomDialogOpen(true);
  };

  const handleCloseCreateRoomDialog = () => {
    setCreateRoomDialogOpen(false);
  };

  const handleCreateRoom = (roomName) => {
    // Aquí puedes manejar la creación de la sala con el nombre recibido.
    // Por ejemplo, puedes realizar una solicitud al servidor para crear la sala.
    console.log('Creating room with name:', roomName);
    // Luego, cierra el diálogo:
    handleCloseCreateRoomDialog();
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
            >
              Refresh
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              style={{
                width: "180px",
              }}
              onClick={handleCreateRoomClick}
            >
              Create Room
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              disabled
              startIcon={<LoginIcon />}
              style={{
                width: "180px",
              }}
            >
              Join Room
            </Button>
          </ListItem>
        </List>
      </Grid>
      <CreateRoomDialog
        open={isCreateRoomDialogOpen}
        onClose={handleCloseCreateRoomDialog}
      />
    </Grid>
  );
}
