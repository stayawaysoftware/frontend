import React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../../contexts/WebsocketContext";

const FinishedAlert = ({ winner, gameId }) => {
  const { websocket } = useWebSocket();

  const navigate = useNavigate();
  const navigateToRoom = () => {
    navigate(`/room/${gameId}`);
  };

  return (
    <>
      <Alert
        variant="filled"
        style={{ marginBottom: "20px", marginTop: "50px" }}
      >
        El ganador de la partida es ... {winner}!!
      </Alert>
      <Alert
        severity="info"
        variant="filled"
        action={
          <Button color="inherit" size="small" onClick={navigateToRoom}>
            Aceptar
          </Button>
        }
      >
        La partida ha finalizado!!
      </Alert>
    </>
  );
};

export default FinishedAlert;
