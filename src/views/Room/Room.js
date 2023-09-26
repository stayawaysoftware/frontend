import React from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

import { TextField } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Room = () => {
  return (
    <div>
      <h1>Room</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
              <Grid item xs ={8} md = {2}>
                <Item>
                  Room name
                </Item>
              </Grid>
              <Grid item xs={4} md={2}> 
                <Item>
                  <Button variant="contained" color="success">Join</Button>
                </Item>
              </Grid>
              <Grid item xs={8} md={2}> 
                <Item>
                  <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </Item>
              </Grid>
              <Grid item xs={4} md={2}> 
                <Item>
                  <Paper elevation={0}/>
                </Item>
              </Grid>
            </Grid>
          </Box>

          

        </div>
      </div>
    )
};

export default Room;

