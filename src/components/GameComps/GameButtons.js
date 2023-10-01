// import * as React from "react";
import React from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";

const Buttons = () => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={8} md={10}>
        <List>
          <ListItem>
            <Button
              variant="contained"
              style={{
                width: "160px",
              }}
            >
              Play Card
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              style={{
                width: "160px",
              }}
              //onClick={}
            >
              Show Card
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              style={{
                width: "160px",
              }}
              //onClick={}
            >
              Stole Card
            </Button>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

export default Buttons;