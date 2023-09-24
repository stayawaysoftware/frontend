import * as React from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";

export default function GameList() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8} md={10}>
        <List>
          <ListItem>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              style={{
                width: "180px",
              }}
            >
              Refresh
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              style={{
                width: "180px",
              }}
            >
              Create Room
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              disabled
              startIcon={<LoginIcon />}
              style={{
                width: "180px",
              }}
            >
              Join Room
            </Button>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
