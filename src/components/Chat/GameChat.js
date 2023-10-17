import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import ChatIcon from "@mui/icons-material/Chat";
import { Chat } from "./Chat";

function GameChat() {
  const [showChat, setshowChat] = useState(false);

  const toggleComponente = () => {
    setshowChat(!showChat);
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        {/* FAB para mostrar/ocultar el componente */}
        <Fab
          color="success"
          aria-label="Add"
          style={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
          }}
          onClick={toggleComponente}
        >
          <ChatIcon />
        </Fab>
      </div>

      {/* Floating chat*/}

      <div
        style={{
          position: "fixed",
          bottom: "100px",
          right: "16px",
          width: showChat ? "500px" : "0px",
          maxHeight: showChat ? "300px" : "0px",
          overflowY: "auto",
          borderRadius: "8px",
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "16px",
            background: "rgba(255,255,230,0.7)",
          }}
        >
          {/* Contenido del componente flotante */}
          <Chat inGame={true} />
        </Paper>
      </div>
    </div>
  );
}

export default GameChat;
