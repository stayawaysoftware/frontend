//form for lobby configuration
//for the current sprint it should only ask name, min and max players

import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

class LobbyConfigForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        name: '',
        };
    }
    
    render() {
        return (
        <form>
            <Stack spacing={2} direction="row">
                <TextField
                id="standard-basic"
                label="Nombre"
                variant="standard"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                />
                <TextField
                //password
                id="standard-basic"
                label="Contraseña (no funcional)"
                variant="standard"
                />
            </Stack>
            <br/>
            <Button variant="contained"> Crear partida </Button>
            

        </form>
        );
    }
}

export default LobbyConfigForm;
