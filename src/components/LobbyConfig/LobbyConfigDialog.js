import React, {useEffect, useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import axios from "axios";

function ValidForm (name) {
  return name.length > 3;
}

export default function CreateRoomDialog({ open, onClose }) {
  const [name, setName] = useState('');
  
  const handleCreateRoom = async (event) => {
    event.preventDefault();

    //base url, should be changed to the API URL constant
    const url = "http://localhost:8000/rooms";

    //build de url with the params
    const params = "?name=" + name + "&host_id=" + 1; 
    const urlFinal = url + params;

    axios.post(urlFinal)
    .then((response) => {
      console.log('Solicitud POST exitosa', response.data);
      // Puedes realizar otras acciones después de la solicitud exitosa
    })
    .catch((error) => {
      console.error('Error en la solicitud POST', error);
      // Puedes manejar el error de alguna manera
    });

    onClose();
  };
    
  
    return (
      <Dialog 
        open={open} 
        onClose={onClose}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>Create Room</DialogTitle>
          <DialogContent>
            <form onSubmit={handleCreateRoom}>
              <Stack spacing={2}>
                  <TextField
                    id="outlined-basic"
                    label="Room name"
                    variant="filled"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
              </Stack>
            </form>
          </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateRoom} disabled={!ValidForm(name)} color="primary" variant="contained">
            Create room
          </Button>
        </DialogActions>
      </Dialog>
    );
  }