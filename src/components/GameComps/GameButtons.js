// import * as React from "react";
import axios from "axios";
import { useContext, useMemo } from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";

import { UserContext } from "../../contexts/UserContext";

const Buttons = ({ current_player, gameId, left_id, right_id }) => {
  const { userid, clickedCard, onCardClicked, targetsEnable } =
    useContext(UserContext);

  const playEnabled = useMemo(() => {
    const isTurn = current_player === userid;
    const isCardClicked = clickedCard !== null && !targetsEnable;
    return isTurn && isCardClicked;
  }, [current_player, userid, clickedCard, targetsEnable]);

  const handlePlayCard = async () => {
    const response = await axios.put(
      `http://localhost:8000/game/${gameId}/play_turn?card_idtype=${clickedCard?.idtype}&current_player_id=${userid}`
    );

    onCardClicked(null);
  };

  return (
    <Grid>
      <Grid item xs={6} md={12}>
        <List>
          <ListItem>
            <Button
              variant="contained"
              style={{
                width: "19%",
              }}
              disabled={!playEnabled}
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
};

export default Buttons;
