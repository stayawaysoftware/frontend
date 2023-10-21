import { useContext, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
//import { useGame } from "../../hooks/useGame";
import Hand from "../../components/GameComps/Hand";
import Buttons from "../../components/GameComps/GameButtons";
import image from "../Background/xd.svg";
import GameTable from "../../components/GameTable/GameTable";
import Deck from "../../components/GameComps/Deck";
import DescPile from "../../components/GameComps/DescPile";
import FinishedAlert from "../../components/FinishedAlert/FinishedAlert";
import Arrows from "../../components/GameComps/Arrows";
import OpponentHandDialog from "../../components/OpponentHandDialog/OpponentHandDialog";

import { Box, Grid, Alert, Chip } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import GameChat from "../../components/Chat/GameChat";
import { useWebSocket } from "../../contexts/WebsocketContext";
import { IdToNameCard } from "../../utils/CardHandler";

const Game = () => {
  const { gameId } = useParams();
  const { userid, playedCard, setPlayedCard, targetId } =
    useContext(UserContext);

  //game data
  const [finished, setFinished] = useState(false);
  const [last_played_card, setLastPlayedCard] = useState(null);
  const [card_target, setCardTarget] = useState(null);
  const [new_card, setNewCard] = useState(null);
  const [played_defense, setPlayedDefense] = useState(null);
  const [defended_card, setDefendedCard] = useState(null);
  const [turn_order, setTurnOrder] = useState(null);
  const [turn_phase, setTurnPhase] = useState(null);
  const [current_turn, setCurrentTurn] = useState(null);
  const [players, setPlayers] = useState(null);
  const [showPlayedCard, setShowPlayedCard] = useState(null);
  const [showOpponentCard, setShowOpponentCard] = useState(false);
  const [defended_by, setDefendedBy] = useState([]);
  const [isSomeoneBeingDefended, setIsSomeoneBeingDefended] = useState(false);

  const { websocket } = useWebSocket();
  const [isLoading, setIsLoading] = useState(true);

  const tableData = players
    ? players.map((player) => ({
        id: player.id,
        name: player.name,
        death: !player.alive,
        position: player.round_position,
      }))
    : [];

  let currentUserCardList = [];
  if (players) {
    currentUserCardList = players
      ?.find((player) => player.id === userid)
      ?.hand.sort(function (a, b) {
        return a.id - b.id;
      });
  }
  if (playedCard && players) {
    const cardRemove = currentUserCardList.find(
      (card) => card.id === playedCard.id
    );
    currentUserCardList.splice(currentUserCardList.indexOf(cardRemove), 1);
    setPlayedCard(null);
  }

  const positionToId = (position) => {
    let id = null;
    players?.forEach((player) => {
      if (player.round_position === position) {
        id = player.id;
      }
    });
    return id;
  };

  const getLeftId = (position) => {
    const n = players.length;
    while (1) {
      const leftPos = position === 1 ? n : position - 1;
      const leftId = positionToId(leftPos);
      if (players.find((player) => player.id === leftId).alive) {
        return leftId;
      } else {
        position = leftPos;
      }
    }
  };

  const getRightId = (position) => {
    const n = players.length;
    while (1) {
      const rightPos = position === n ? 1 : position + 1;
      const rightId = positionToId(rightPos);
      if (players.find((player) => player.id === rightId).alive) {
        return rightId;
      } else {
        position = rightPos;
      }
    }
  };

  function onGameMessage(event) {
    const json = JSON.parse(event.data);
    console.log("Mensaje recibido en game: ", json);
    if (json.type === "game_info") {
      setPlayers(json.game.players);
      setCurrentTurn(json.game.current_turn);
      setTurnPhase(json.game.turn_phase);
      setTurnOrder(json.game.turn_order);
      setIsLoading(false);
    } else if (json.type === "new_turn") {
      setCurrentTurn(json.current_turn);
    } else if (json.type === "draw") {
      setNewCard(json.new_card);
    } else if (json.type === "play") {
      setShowPlayedCard(json.played_card.idtype);
      setCardTarget(json.card_player);
    } else if (json.type === "try_defense") {
      setLastPlayedCard(json.played_card.idtype);
      setCardTarget(json.target_player);
      setDefendedBy(json.defended_by);
      setIsSomeoneBeingDefended(true);
    } else if (json.type === "defense") {
      setIsSomeoneBeingDefended(false);
      setPlayedDefense(json.played_defense);
    } else if (json.type === "exchange_ask") {
      setCardTarget(json.target_player);
    }
  }

  if (websocket) {
    websocket.onmessage = onGameMessage;
  }

  /*   const handleDiscard = (card) => {
    if (websocket) {
      const messageData = JSON.stringify({
        type: "discard",
        last_played_card: card,
      });
      websocket.send(messageData);
    }
  }

  const handleExchange = (card) => {
    if (websocket) {
      const messageData = JSON.stringify({
        type: "exchange_ask",
        target_player: 
        current_turn: current_turn,
        card_user
        card_target

      });
      websocket.send(messageData);
    }
  } */

  const handleCloseOpponentCardDialog = () => {
    setShowOpponentCard(false);
  };
  const checkIfDead = () => {
    let b = false;
    players?.forEach((player) => {
      if (player.id === userid && player.alive === false) {
        b = true;
      }
    });
    return b;
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        {userid === positionToId(current_turn) && (
          <Alert
            severity="success"
            style={{
              position: "absolute",
              top: "5%",
              left: "2%",
            }}
          >
            Es tu turno, {players.find((player) => player.id === userid).name}!
          </Alert>
        )}
        {userid === card_target && (
          <Alert
            severity="warning"
            style={{
              position: "absolute",
              top: "5%",
              left: "2%",
            }}
          >
            Te han atacado con {IdToNameCard(last_played_card)},{" "}
            {players.find((player) => player.id === userid).name}!!
          </Alert>
        )}
        {isLoading ? (
          // Mostrar el mensaje de carga si loading es true
          <p>Loading...</p>
        ) : (
          // Mostrar los datos del juego si loading es false
          <>
            {true === checkIfDead() ? (
              <Alert
                severity="error"
                style={{
                  position: "absolute",
                  top: "5%",
                  left: "2%",
                }}
              >
                Estas muerto,{" "}
                {players.find((player) => player.id === userid).name}!
              </Alert>
            ) : (
              <h1> </h1>
            )}
            <GameTable
              playersTable={tableData}
              currentTurn={positionToId(current_turn)}
              left_id={getLeftId(current_turn)}
              right_id={getRightId(current_turn)}
              turnDefense={card_target}
              isSomeoneBeingDefended={isSomeoneBeingDefended}
            />
            <Box>
              <Grid
                item
                xs={6}
                md={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  gap: 1,
                }}
              >
                <Arrows turnOrder={turn_order} />
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6} md={20}>
                  <Deck />
                </Grid>
              </Grid>
              <div
                style={{
                  position: "relative",
                  left: "10%",
                  transform: "translate(16%, 0%)",
                  marginBottom: "-70%",
                }}
              ></div>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6} md={20}>
                  <DescPile lastCard={showPlayedCard} />
                </Grid>
              </Grid>
              <div
                style={{
                  position: "relative",
                  left: "10%",
                  transform: "translate(16%, 0%)",
                }}
              ></div>
            </Box>

            <>
              <OpponentHandDialog
                open={showOpponentCard}
                onClose={handleCloseOpponentCardDialog}
                cardList={currentUserCardList}
                opponentName={
                  players?.find((player) => player.id === userid).name
                }
              />
            </>

            <Box>
              <Grid
                spacing={2}
                sx={{
                  position: "relative",
                  top: "170px",
                  justifyContent: "center",
                }}
              >
                <Grid
                  item
                  spacing={2}
                  xs={6}
                  md={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "-280px",
                  }}
                >
                  <Hand
                    cardList={currentUserCardList}
                    defense={defended_by}
                    target_player={card_target}
                  />
                </Grid>
                <Box
                  sx={{
                    marginBottom: "4%",
                  }}
                >
                  <Chip
                    color="success"
                    variant="outlined"
                    label={players.find((player) => player.id === userid).name}
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "black",
                      marginTop: "1%",
                    }}
                  />
                </Box>
              </Grid>
              <div
                style={{
                  position: "relative",
                  left: "55%",
                  transform: "translate(16%, 0%)",
                  marginTop: 0,
                  top: "-120px",
                }}
              >
                <Buttons
                  current_player={positionToId(current_turn)}
                  gameId={gameId}
                  target_player={card_target}
                  isDefended={isSomeoneBeingDefended}
                />
              </div>
            </Box>
            {finished && (
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: "5%",
                  left: "2%",
                }}
              >
                <FinishedAlert playersName={players[0]?.name} gameId={gameId} />
              </Grid>
            )}
          </>
        )}
      </div>
      <GameChat />
    </div>
  );
};

export default Game;
