//form for lobby configuration
//for the current sprint it should only ask name, min and max players

import React, { Component } from 'react';
import TextField from '@mui/material/TextField';

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
            <TextField
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            />
        </form>
        );
    }
}

export default LobbyConfigForm;
