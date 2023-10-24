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
  lastChosenCard,
  turnPhase,
  setIsSomeoneBeingDefended,
  exchangeRequester,
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
  const exchangeEnabled =
    ((isTurn && isCardClicked) || target_player === userid) &&
    (turnPhase === "Exchange" || turnPhase === "Exchange_defense");

  const playEnabled =
    (isTurn && isCardClicked && !exchangeEnabled) ||
    (isCardTarget && isCardClicked && isTurn && !exchangeEnabled) ||
    (isDefended && target_player === userid);

  const playEnabledDisc =
    isTurn && isCardClicked && !isDefended && !exchangeEnabled;

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

  const handleDiscardCard = () => {
    if (websocket) {
      const messageData = JSON.stringify({
        type: "discard",
        played_card: clickedCard.id,
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

  const handleExchangeDefense = () => {
    if (websocket) {
      if (clickedCard && !isDefended) {
        let messageData;
        console.log("hacer intercambio");
        messageData = JSON.stringify({
          type: "exchange_defense",
          chosen_card: clickedCard.id,
          last_chose: lastChosenCard.id,
          exchange_requester_id: exchangeRequester,
          is_defense: false,
        });
        console.log("SE ENVIA EXCHANGE ESTO: ", messageData);
        websocket.send(messageData);
        onCardClicked(null);
      } else if (clickedCard && isDefended) {
        let messageData;
        messageData = JSON.stringify({
          type: "exchange_defense",
          chosen_card: clickedCard.id,
          last_chose: lastChosenCard.id,
          exchange_requester_id: exchangeRequester,
          is_defense: true,
        });
        console.log("SE ENVIA DEFENSA EXCHANGE ESTO: ", messageData);
        websocket.send(messageData);
        setPlayedCard(clickedCard);
        onCardClicked(null);
      } else {
        // habilitar intercambio
        console.log("habilitar intercambio, cerrar exchange defense");
        setIsSomeoneBeingDefended(false);
      }
    }
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
              onClick={
                exchangeEnabled
                  ? handleExchangeDefense
                  : isDefended
                  ? handleDefense
                  : handlePlayCard
              }
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
              onClick={handleExchangeDefense}
              color="success"
            >
              Intercambiar carta
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              style={{
                width: "19%",
              }}
              disabled={!playEnabledDisc}
              onClick={handleDiscardCard}
              color="success"
            >
              Descartar carta
            </Button>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default Buttons;
