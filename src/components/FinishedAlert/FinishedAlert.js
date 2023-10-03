import React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const FinishedAlert = ({ gamePlayersName, gameId }) => {
  const navigate = useNavigate();
  const navigateToRoom = () => {
    // DELETE /game/:gameId
    navigate(`/room/${gameId}`);
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
