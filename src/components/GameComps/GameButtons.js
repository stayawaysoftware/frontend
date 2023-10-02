// import * as React from "react";
import React, {useContext} from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";

import { UserContext } from "../../contexts/UserContext";

function PlayEnabled(current_player, userid, clickedCard) {
  const isTurn = current_player === userid;
  const isCardClicked = clickedCard !== null;
  return isTurn && isCardClicked;
}

const Buttons = ({current_player}) => {
  const { userid, clickedCard, setClickedCard } = useContext(UserContext);

  const handlePlayCard = () => {
    console.log("Play Card", clickedCard);

    setClickedCard(null);
    //here there should be the request to play the card
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={8} md={10}>
        <List>
          <ListItem>
            <Button
              variant="contained"
              style={{
                width: "15%",
              }}
              disabled={!PlayEnabled(current_player, userid, clickedCard)}
              onClick={handlePlayCard}
            >
              Play Card
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              style={{
                width: "15%",
              }}
              disabled={true}
              //onClick={}
            >
               Exchange Card
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              style={{
                width: "15%",
              }}
              disabled={true}
              //onClick={}
            >
              Draw Card
            </Button>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

export default Buttons;