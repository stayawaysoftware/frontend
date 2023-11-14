import { useContext } from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import { useWebSocket } from "../../contexts/WebsocketContext";
import { UserContext } from "../../contexts/UserContext";
import { isCardPlaylable } from "../../utils/CardHandler";
import { click } from "@testing-library/user-event/dist/click";

const Buttons = ({
  current_player,
  target_player,
  isDefended,
  last_played_card,
  lastChosenCard,
  messageType,
  next_target_id,
  turnPhase,
  setIsSomeoneBeingDefended,
  exchangeRequester,
  isNotPanicCard,
  lastCardPlayedForSeduction,
  currentUserDoorLocked,
  turnOrder,
  isExchangeTarget,
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
  const isCardWithTargetClicked = clickedCard !== null && targetsEnable;
  const exchangeEnabled = turnPhase === "Exchange";
  const exchangeEnabledDefense = !isDefended && exchangeEnabled && clickedCard;

  const playEnabled =
    (isTurn &&
      isCardClicked &&
      !exchangeEnabled &&
      isCardPlaylable(clickedCard.idtype, false, "", false, false, false)) ||
    (isCardTarget &&
      isCardClicked &&
      isTurn &&
      !exchangeEnabled &&
      isCardPlaylable(clickedCard.idtype, false, "", false, false, false)) ||
    (isDefended && target_player === userid);

  const playEnabledDisc =
    (isTurn &&
      isCardClicked &&
      !isDefended &&
      !exchangeEnabled &&
      isNotPanicCard) ||
    (isTurn &&
      isCardWithTargetClicked &&
      !isDefended &&
      !exchangeEnabled &&
      isNotPanicCard);

  console.log("isExchangeTarget: ", isExchangeTarget);

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
        played_card: clickedCard.idtype,
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

  const handleExchange = () => {
    console.log("handleExchange");
    if (
      (turnOrder === true && currentUserDoorLocked === -1) ||
      (turnOrder === false && currentUserDoorLocked === 1)
    ) {
      if (websocket) {
        console.log("cannot_exchange");
        const messageData = JSON.stringify({
          type: "cannot_exchange",
        });
        websocket.send(messageData);
      }
    } else {
      if (websocket && clickedCard) {
        const messageData = JSON.stringify({
          type: "exchange",
          target_player: next_target_id,
          chosen_card: clickedCard.id,
        });
        websocket.send(messageData);
      }
    }
  };

  const handleExchangeDefense = () => {
    console.log({ clickedCard, isDefended, lastChosenCard });
    if (websocket) {
      if (clickedCard) {
        if (!isDefended) {
          let messageData;
          console.log("hacer intercambio");
          messageData = JSON.stringify({
            type: "exchange_defense",
            chosen_card: clickedCard.id,
            last_chose: lastChosenCard?.id,
            exchange_requester_id: exchangeRequester,
            is_defense: false,
          });
          console.log("SE ENVIA EXCHANGE ESTO: ", messageData);
          websocket.send(messageData);
          onCardClicked(null);
        } else {
          let messageData;
          messageData = JSON.stringify({
            type: "exchange_defense",
            chosen_card: clickedCard.id,
            last_chose: lastChosenCard?.id,
            exchange_requester_id: exchangeRequester,
            is_defense: true,
          });
          console.log("SE ENVIA DEFENSA EXCHANGE ESTO: ", messageData);
          websocket.send(messageData);
          setPlayedCard(clickedCard);
          onCardClicked(null);
        }
      }
      // habilitar intercambio
      console.log("habilitar intercambio, cerrar exchange defense");
      setIsSomeoneBeingDefended(false);
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
              {isDefended
                ? clickedCard
                  ? "Defender"
                  : "No defenderte"
                : "Jugar Carta"}
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              style={{
                width: "19%",
              }}
              disabled={!exchangeEnabledDefense}
              onClick={
                isExchangeTarget ? handleExchangeDefense : handleExchange
              }
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
