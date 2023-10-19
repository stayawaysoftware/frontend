import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import { useGame } from "../../hooks/useGame";
import Hand from "../../components/GameComps/Hand";
import Buttons from "../../components/GameComps/GameButtons";
import image from "../Background/xd.svg";
import GameTable from "../../components/GameTable/GameTable";
import Deck from "../../components/GameComps/Deck";
import DescPile from "../../components/GameComps/DescPile";
import FinishedAlert from "../../components/FinishedAlert/FinishedAlert";
import { Box, Grid, Alert, Chip } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import { useWebSocket } from "../../contexts/WebsocketContext";

const Game = () => {
  const { gameId } = useParams();
  const { userid } = useContext(UserContext);

  //game data
  const [finished, setFinished] = useState(true);
  //const [forceRender, setForceRender] = useState(0);
  const [last_played_card, setLastPlayedCard] = useState(null);
  const [card_target, setCardTarget] = useState(null);
  const [new_card, setNewCard] = useState(null);
  const [played_defense, setPlayedDefense] = useState(null);
  const [defended_card, setDefendedCard] = useState(null);
  const [turn_order, setTurnOrder] = useState(null);
  const [turn_phase, setTurnPhase] = useState(null);
  const [current_turn, setCurrentTurn] = useState(null);
  const [players, setPlayers] = useState(null);
  const [played_card, setPlayedCard] = useState(null);

  const { websocket } = useWebSocket();
  const [isLoading, setIsLoading] = useState(true);
  //console.log({ gameData, isLoading });
  console.log("websocket:", websocket );

  const currentTurn = current_turn;

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
      .find((player) => player.id === userid)
      ?.hand.sort(function (a, b) {
        return a.id - b.id;
      });
  }

/*   const handleForceRender = () => {
    setForceRender(currentTurn);
  }; */

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

  // Este useEffect se encarga de escuchar los mensajes del websocket

  function onGameMessage(event) {
    const json = JSON.parse(event.data);
    console.log("Mensaje recibido en game: ", json);
    const game_data = json.game;
    console.log("Game info received: ", game_data);
    if (json.type === "game_info") {
      setPlayers(game_data.players.players);
      setCurrentTurn(game_data.current_turn);
      setTurnPhase(game_data.turn_phase);
      setTurnOrder(game_data.turn_order);
      setIsLoading(false);
    } else if (json.type === "new_turn") {
      setCurrentTurn(game_data.current_turn);
    } else if (json.type === "draw") {
      setNewCard(game_data.new_card);
    } else if (json.type === "play") {
      setPlayedCard(json.played_card);
      setCardTarget(json.card_player);
    } else if (json.type === "try_defense") {
      setLastPlayedCard(game_data.last_played_card);
      setCardTarget(game_data.target_player);
    } else if (json.type === "defense") {
      setPlayedDefense(game_data.played_defense);
    } else if (json.type === "exchange_ask") {
      setCardTarget(game_data.target_player);
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
        target_player: players.find((player) => player.id === userid).id,
      });
      websocket.send(messageData);
    }
  } */

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
        {userid === positionToId(currentTurn) ? (
          <Alert
            severity="success"
            style={{
              position: "absolute",
              top: "5%",
              left: "2%",
            }}
          >
            Es tu turno,{" "}
            {players.find((player) => player.id === userid).name}!
          </Alert>
        ) : (
          <h1> </h1>
        )}
        {isLoading ? (
          // Mostrar el mensaje de carga si loading es true
          <p>Loading...</p>
        ) : (
          // Mostrar los datos del juego si loading es false
          <> 
            <GameTable
              playersTable={tableData}
              currentTurn={currentTurn}
              //forceRender={forceRender}
              left_id={getLeftId(currentTurn)}
              right_id={getRightId(currentTurn)}
            />
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
                  <DescPile lastCard={last_played_card} />
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
              <Grid
                container
                spacing={2}
                sx={{
                  position: "relative",
                  top: "170px",
                  justifyContent: "center",
                }}
              >
                <Grid
                  item
                  xs={6}
                  md={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Hand cardList={currentUserCardList} />
                </Grid>
                <Box
                  sx={{
                    marginBottom: "4%",
                  }}
                >
                  <Chip
                    color="success"
                    variant="outlined"
                    label={
                      players.find((player) => player.id === userid)
                        .name
                    }
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "black",
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
                  top: "-80px",
                }}
              >
                <Buttons
                  current_player={positionToId(currentTurn)}
                  gameId={gameId}
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
                <FinishedAlert
                  playersName={players[0]?.name}
                  gameId={gameId}
                />
              </Grid>
            )}
          </>
        )} 
      </div>
    </div>
  );
};

export default Game;
