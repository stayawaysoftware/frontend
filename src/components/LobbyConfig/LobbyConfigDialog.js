import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT_ROOM_CREATE } from "../../utils/ApiTypes";

function ValidForm(name) {
  return name.length > 3;
}

export default function CreateRoomDialog({ open, onClose }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const { userid } = React.useContext(UserContext);

  const handleCreateRoom = async (event) => {
    event.preventDefault();
    var roomid = null; //initialize the roomid variable

    const url = API_ENDPOINT_ROOM_CREATE;
    let parameters = new FormData();
    parameters.append("name", name);
    parameters.append("password", null);
    parameters.append("host_id", userid);
    parameters.append("min_players", 4);
    parameters.append("max_players", 12);

    //base url, should be changed to the API URL constant
    const response = await axios
      .post(url, parameters)
      .then((response) => {
        console.log("Solicitud POST exitosa", response.data);
        roomid = response.data.room_id; //get the roomid from the response
        navigate("/room/" + roomid);
      })
      .catch((error) => {
        console.error("Error en la solicitud POST", error);
      });

    console.log(roomid);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Crear Sala</DialogTitle>
      <DialogContent>
        <form onSubmit={handleCreateRoom}>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              label="Nombre de la sala"
              variant="filled"
              color="success"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="success">
          Cancelar
        </Button>
        <Button
          onClick={handleCreateRoom}
          disabled={!ValidForm(name)}
          color="success"
          variant="contained"
        >
          Crear Sala
        </Button>
      </DialogActions>
    </Dialog>
  );
}
