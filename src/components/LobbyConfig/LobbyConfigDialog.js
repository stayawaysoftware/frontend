import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function CreateRoomDialog({ open, onClose }) {
  const [roomName, setRoomName] = React.useState('');

  const [name, setName] = React.useState('');
    const handleCreateRoom = (event) => {
      event.preventDefault();
      const data = { name};
      console.log(data);
    };
  
    return (
      <Dialog 
        open={open} 
        onClose={onClose}
      >
        <DialogTitle>Create Room</DialogTitle>
          <DialogContent>
            <form onSubmit={handleCreateRoom}>
              <Stack spacing={2}>
                  <TextField
                    id="outlined-basic"
                    label="Room name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
              </Stack>
            </form>
          </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreateRoom} color="primary" variant="contained">
            Crear Sala
          </Button>
        </DialogActions>
      </Dialog>
    );
  }