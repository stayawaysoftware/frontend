// import * as React from "react";
import React, {useContext} from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";

import { UserContext } from "../../contexts/UserContext";
import { CardHasTarget  } from "../../utils/CardHandler";
import { Stack } from "@mui/material";
import axios from "axios";

function PlayEnabled(current_player, userid, clickedCard) {
  const isTurn = current_player === userid;
  const isCardClicked = clickedCard !== null && !TargetsEnable(current_player, userid, clickedCard);
  return isTurn && isCardClicked;
}

function TargetsEnable(current_player, userid, clickedCard) {
  const isTurn = current_player === userid;
  return isTurn && CardHasTarget(clickedCard);
}



const Buttons = ({current_player, gameId, left_id, right_id}) => {
  const { userid, clickedCard, setClickedCard } = useContext(UserContext);


  const handlePlayCard = async () => {
    const response = await axios.put(
      `http://localhost:8000/game/${gameId}/play_turn?card_idtype=${clickedCard}&current_player_id=${userid}`
    );

    setClickedCard(null);
  };

  const handlePlayLeft = async () => {
    const response = await axios.put(
      `http://localhost:8000/game/${gameId}/play_turn?card_idtype=${clickedCard}&current_player_id=${userid}&target_player_id=${left_id}`
    );

    setClickedCard(null);
  }

  const handlePlayRight= async () => {
    const response = await axios.put(
      `http://localhost:8000/game/${gameId}/play_turn?card_idtype=${clickedCard}&current_player_id=${userid}&target_player_id=${right_id}`
    );

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
                  width: "22%",
                }}
                disabled={!TargetsEnable(current_player, userid, clickedCard)}
                onClick={handlePlayLeft}
                color="success"
              >
                Jugador izquierda
              </Button>
              <Button
                variant="contained"
                style={{
                  width: "22%",
                }}
                disabled={!TargetsEnable(current_player, userid, clickedCard)}
                onClick={handlePlayRight}
                color="success"
              >
                Jugador derecha
              </Button>
            </Stack>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              style={{
                width: "19%",
              }}
              disabled={!PlayEnabled(current_player, userid, clickedCard)}
              onClick={handlePlayCard}
              color="success"
            >
              Jugar Carta
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              style={{
                width: "19%",
              }}
              disabled={true}
              color="success"
              //onClick={}
            >
               Intercambiar carta
            </Button>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

export default Buttons;