// import * as React from "react";
import { useContext } from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
//importar websocket
import { useWebSocket } from "../../contexts/WebsocketContext";
import { UserContext } from "../../contexts/UserContext";

const Buttons = ({
  current_player,
  target_player,
  isDefended,
  last_played_card,
  chosen_card,
  turn_phase,
  setIsSomeoneBeingDefended,
}) => {
  const {
    userid,
    clickedCard,
    onCardClicked,
    targetsEnable,
    setPlayedCard,
    targetId,
  } = useContext(UserContext);

  const { websocket } = useWebSocket();
  const isCardTarget = target_player === targetId;
  const isTurn = current_player === userid && !isDefended;
  const isCardClicked = clickedCard !== null && !targetsEnable;
  const exchangeEnabled = ((isTurn && isCardClicked && !isDefended) || (!isDefended && target_player === userid)) && 
    (turn_phase === "exchange" || turn_phase === "exchange_defense");
  const playEnabled =
    (isTurn && isCardClicked && !exchangeEnabled) ||
    (isCardTarget && isCardClicked && isTurn && !exchangeEnabled) ||
    (isDefended && target_player === userid);
  

  const handlePlayCard = () => {
    if (websocket) {
      const messageData = JSON.stringify({
        type: "play",
        played_card: clickedCard.id,
        card_target: current_player,
      });
      websocket.send(messageData);
    }
    setPlayedCard(clickedCard);
    onCardClicked(null);
  };

  const handleDefense = () => {
    if (websocket) {
      if (clickedCard) {
        const messageData = JSON.stringify({
          type: "defense",
          target_player: current_player,
          last_played_card: last_played_card.id,
          played_defense: clickedCard.id,
        });
        websocket.send(messageData);
      } else {
        const messageData = JSON.stringify({
          type: "defense",
          target_player: current_player,
          played_defense: 0,
          last_played_card: last_played_card.id,
        });
        websocket.send(messageData);
      }
    }
    setPlayedCard(clickedCard);
    onCardClicked(null);
  };

  const handleExchange = (card) => {
    if (websocket) {
      const messageData = JSON.stringify({
        type: "exchange",
        target_player: current_player,
        chosen_card: clickedCard.id,
      });
      websocket.send(messageData);
    }
  };

  const handleExchangeDefense = () => {
    if (websocket) {
      let messageData;
      if (clickedCard) {
        messageData = JSON.stringify({
          type: "exchange_defense",
          target_player: current_player,
          chosen_card: clickedCard.id,
          is_defended: true,
        });
      } else {
        // habilitar intercambio
        setIsSomeoneBeingDefended(false);
      }
  
      websocket.send(messageData);
    }
  }

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
              onClick={isDefended ? handleDefense : handlePlayCard}
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
              disabled={!exchangeEnabled}
              onClick={isDefended ? handleExchangeDefense : handleExchange}
              color="success"
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
