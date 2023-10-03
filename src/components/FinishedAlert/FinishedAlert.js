import React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FinishedAlert = ({ gamePlayersName, gameId }) => {
  const navigate = useNavigate();
  const navigateToRoom = () => {
    try {
      const response = axios.delete(`http://localhost:8000/game/${gameId}`);
      console.log(response);
      navigate(`/room/${gameId}`);
    } catch (error) {
      console.error("Error al eliminar el juego:", error);
    }
  };

  return (
    <>
      <Alert
        variant="filled"
        style={{ marginBottom: "20px", marginTop: "50px" }}
      >
        El ganador de la partida es ... {gamePlayersName}!!
      </Alert>
      <Alert
        severity="info"
        variant="filled"
        action={
          <Button color="inherit" size="small" onClick={navigateToRoom}>
            Accept
          </Button>
        }
      >
        Game has finished!!
      </Alert>
    </>
  );
};

export default FinishedAlert;
