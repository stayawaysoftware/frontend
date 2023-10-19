// import * as React from "react";
import { useContext } from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
//importar websocket
import { useWebSocket } from "../../contexts/WebsocketContext";

import { UserContext } from "../../contexts/UserContext";

const Buttons = ({current_player, target_player}) => {
  const { userid, clickedCard, onCardClicked, targetsEnable, setPlayedCard, targetId} =
    useContext(UserContext);

  const { websocket } = useWebSocket();

  const isTurn = current_player === userid;
  const isCardClicked = clickedCard !== null && !targetsEnable;
  const isCardTarget = target_player === targetId;
  const playEnabled = (isTurn && isCardClicked) || (isCardTarget && isCardClicked);

  const handlePlayCard = () => {
    if (websocket) {
      const messageData = JSON.stringify({
        type: "play",
        played_card: clickedCard,
        card_target: null,
      });
      console.log("ws:", websocket);
      websocket.send(messageData);
      console.log("clickedCard:", clickedCard);
    }
    setPlayedCard(clickedCard);
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
