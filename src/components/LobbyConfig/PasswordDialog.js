import { useState } from "react";
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT_ROOM_JOIN } from "../../utils/ApiTypes";
import {
  Typography,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function PasswordDialog({
  open,
  onClose,
  room_name,
  userid,
  roomid,
}) {
  const [password, setPassword] = useState("");
  const [dialogError, setDialogError] = useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleJoinPrivateRoom = async (event) => {
    event.preventDefault();
    const url = API_ENDPOINT_ROOM_JOIN;
    const parameters = {
      room_id: roomid,
      user_id: userid,
      password: password.trim() === "" ? null : password,
    };

    await axios
      .put(url, parameters)
      .then((response) => {
        navigate("/room/" + roomid);
        setPassword("");
        setDialogError(null);
        onClose();
      })
      .catch((error) => {
        console.error("Error en la solicitud POST", error);
        setDialogError(error.response.data.detail);
        setPassword("");
      });
  };

  const closeDialog = () => {
    setPassword("");
    setDialogError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Sala Privada {room_name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleJoinPrivateRoom}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            {password === "" ? (
              <LockOpenIcon
                sx={{
                  color: "action.active",
                  mr: 1,
                  my: dialogError ? 3.5 : 0.5,
                }}
              />
            ) : (
              <LockIcon
                sx={{
                  color: "action.active",
                  mr: 1,
                  my: dialogError ? 3.5 : 0.5,
                }}
              />
            )}
            <TextField
              id="password"
              label="Contraseña"
              variant="standard"
              color="success"
              type={showPassword ? "text" : "password"}
              fullWidth
              error={dialogError}
              helperText={dialogError}
              value={password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="success">
          Cancelar
        </Button>
        <Button
          onClick={handleJoinPrivateRoom}
          color="success"
          variant="contained"
        >
          Unirse
        </Button>
      </DialogActions>
    </Dialog>
  );
}
