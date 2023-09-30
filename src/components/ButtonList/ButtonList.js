// import * as React from "react";
import React, { useState, useContext } from "react";
import { JoinRoomContext } from "../../contexts/JoinRoomContext";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";
import CreateRoomDialog from "../LobbyConfig/LobbyConfigDialog";

export default function ButtonList({ joinRoom }) {
  const [isCreateRoomDialogOpen, setCreateRoomDialogOpen] = useState(false);
  const { roomid } = useContext(JoinRoomContext);
  const navigate = useNavigate();

  const handleCreateRoomClick = () => {
    setCreateRoomDialogOpen(true);
  };

  const handleCloseCreateRoomDialog = () => {
    setCreateRoomDialogOpen(false);
  };

  const handleJoinRoom = () => {
    navigate("/room/" + roomid);
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
              disabled={roomid === null}
              startIcon={<LoginIcon />}
              style={{
                width: "180px",
              }}
              onClick={handleJoinRoom}
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
