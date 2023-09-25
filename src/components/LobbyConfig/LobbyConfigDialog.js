import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function ValidForm (name) {
  return name.length > 3;
}

export default function CreateRoomDialog({ open, onClose }) {
  const [roomName, setRoomName] = React.useState('');

  const [name, setName] = React.useState('');
    const handleCreateRoom = (event) => {
      event.preventDefault();
      const data = { name};
      console.log(data);
      //close the dialog
      onClose();
      //in the future we will send the data to the server
      //and the server will create the room
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