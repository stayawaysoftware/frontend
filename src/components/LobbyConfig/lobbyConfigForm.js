//form for lobby configuration
//for the current sprint it should only ask name

import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function LobbyConfigForm() {
    const [name, setName] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { name};
        console.log(data);
        // for the time being, we will just log the data
        // when we have the API designed, we shall call it here
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    id="outlined-basic"
                    label="Nombre de sala"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Stack>
            <br/>
            <Button 
                variant="contained"
                type="submit"
                disabled={!name}
            >
                Crear Partida
            </Button>
            
        </form>
    );
}

export default LobbyConfigForm;
