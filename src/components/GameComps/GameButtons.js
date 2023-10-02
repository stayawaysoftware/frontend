// import * as React from "react";
import React, {useContext} from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";

import { UserContext } from "../../contexts/UserContext";
import { CardHasTarget  } from "../../utils/CardHandler";
import { Stack } from "@mui/material";

function PlayEnabled(current_player, userid, clickedCard) {
  const isTurn = current_player === userid;
  const isCardClicked = clickedCard !== null && !TargetsEnable(current_player, userid, clickedCard);
  return isTurn && isCardClicked;
}

function TargetsEnable(current_player, userid, clickedCard) {
  const isTurn = current_player === userid;
  return isTurn && CardHasTarget(clickedCard);
}

const Buttons = ({current_player}) => {
  const { userid, clickedCard, setClickedCard } = useContext(UserContext);

  const handlePlayCard = () => {
    console.log(clickedCard);

    // console.log("card has target?", CardHasTarget(clickedCard));

    setClickedCard(null);
    //here there should be the request to play the card
  }

  const handlePlayLeft = () => {
    console.log("play left", clickedCard);

    setClickedCard(null);
  }

  const handlePlayRight = () => {
    console.log("play right", clickedCard);

    setClickedCard(null);
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={8} md={10}>
        <List>
          <ListItem>
            <Stack direction="row" spacing={4}>
              <Button
                variant="contained"
                style={{
                  width: "15%",
                }}
                disabled={!TargetsEnable(current_player, userid, clickedCard)}
                onClick={handlePlayLeft}
              >
                Play Left
              </Button>
              <Button
                variant="contained"
                style={{
                  width: "18%",
                }}
                disabled={!TargetsEnable(current_player, userid, clickedCard)}
                onClick={handlePlayRight}
              >
                Play right
              </Button>
            </Stack>
          </ListItem>
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
        </List>
      </Grid>
    </Grid>
  );
}

export default Buttons;