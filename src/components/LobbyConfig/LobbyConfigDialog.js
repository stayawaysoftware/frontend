import React, { useState } from "react";
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
import Slider from "@mui/material/Slider";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

function ValidForm(name) {
  return name.length > 3;
}

function MinMaxSlider({ value, onChangeSlider }) {
  // const [value, setValue] = React.useState([4, 12]);
  const minDistance = 0;

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 12 - minDistance);
        onChangeSlider([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        onChangeSlider([clamped - minDistance, clamped]);
      }
    } else {
      onChangeSlider(newValue);
    }
  };

  return (
    <Box>
      <Typography
        id="range-slider"
        gutterBottom
        style={{ textAlign: "center" }}
      >
        Rango de jugadores
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <PersonIcon />
        <Slider
          getAriaLabel={() => "Minimum distance shift"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          disableSwap
          // step={1}
          min={4}
          max={12}
          marks={true}
          color={"success"}
        />
        <PeopleIcon />
      </Stack>
    </Box>
  );
}

export default function CreateRoomDialog({ open, onClose, setError }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [minUsers, setMinUsers] = useState(4);
  const [maxUsers, setMaxUsers] = useState(12);
  const navigate = useNavigate();

  const { userid } = React.useContext(UserContext);

  const handleCreateRoom = async (event) => {
    event.preventDefault();
    var roomid = null; //initialize the roomid variable

    const url = API_ENDPOINT_ROOM_CREATE;
    const parameters = {
      name: name,
      password: password.trim() === "" ? null : password,
      host_id: userid,
      min_users: minUsers,
      max_users: maxUsers,
    };

    await axios
      .post(url, parameters)
      .then((response) => {
        console.log("Solicitud POST exitosa", response.data);
        roomid = response.data.id; //get the roomid from the response
        navigate("/room/" + roomid);
      })
      .catch((error) => {
        console.error("Error en la solicitud POST", error);
        setError(error.response.data.detail);
      });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Crear Sala</DialogTitle>
      <DialogContent>
        <form onSubmit={handleCreateRoom}>
          <Stack spacing={5}>
            <Stack
              sx={{ display: "flex", alignItems: "flex-end" }}
              spacing={5}
              direction="row"
              alignItems="center"
            >
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  id="roomName"
                  label="Nombre de la sala"
                  variant="standard"
                  color="success"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                {password === "" ? (
                  <LockOpenIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                ) : (
                  <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                )}
                <TextField
                  id="outlined-basic"
                  label="Contraseña"
                  variant="standard"
                  color="success"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
            </Stack>
            <MinMaxSlider
              value={[minUsers, maxUsers]}
              onChangeSlider={(value) => {
                setMinUsers(value[0]);
                setMaxUsers(value[1]);
              }}
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
          id="createRoom"
        >
          Crear Sala
        </Button>
      </DialogActions>
    </Dialog>
  );
}
