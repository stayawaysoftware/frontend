import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Hand from "../../components/GameComps/Hand";
import Buttons from "../../components/GameComps/GameButtons";
import image from "../Background/xd.svg";
import GameTable from "../../components/GameTable/GameTable";
import Deck from "../../components/GameComps/Deck";
import DescPile from "../../components/GameComps/DescPile";
import FinishedAlert from "../../components/FinishedAlert/FinishedAlert";
import Arrows from "../../components/GameComps/Arrows";
import OpponentHandDialog from "../../components/OpponentHandDialog/OpponentHandDialog";
import left_door from "../../assets/left_door.png";
import right_door from "../../assets/right_door.png";

import { Box, Grid, Alert, Chip } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import GameChat from "../../components/Chat/GameChat";
import { useWebSocket } from "../../contexts/WebsocketContext";
import { IdToNameCard } from "../../utils/CardHandler";
import { ActionLog, createAction } from "../../components/ActionLog/ActionLog";

const Game = () => {
  const { gameId } = useParams();
  const {
    userid,
    playedCard,
    setPlayedCard,
    setClickedCard,
    onCardClicked,
    setIsExchangePhase,
  } = useContext(UserContext);

  //game data
  const [finished, setFinished] = useState(false);
  const [last_played_card, setLastPlayedCard] = useState(null);
  const [card_target, setCardTarget] = useState(null);
  const [new_card, setNewCard] = useState(null);
  const [turn_order, setTurnOrder] = useState(null);
  const [turn_phase, setTurnPhase] = useState(null);
  const [current_turn, setCurrentTurn] = useState(null);
  const [players, setPlayers] = useState(null);
  const [showPlayedCard, setShowPlayedCard] = useState(null);
  const [showOpponentCard, setShowOpponentCard] = useState(false);
  const [defended_by, setDefendedBy] = useState([]);
  const [isSomeoneBeingDefended, setIsSomeoneBeingDefended] = useState(false);
  const [last_chosen_card, setLastChosenCard] = useState(null);
  const [exchange_requester, setExchangeRequester] = useState(null);
  const [carsToShow, setCarsToShow] = useState([]);
  const [player_name, setPlayerName] = useState(null);
  const [winner, setWinner] = useState(null);
  const [isPlayPhase, setIsPlayPhase] = useState(false);
  const [door_locked, setDoorLocked] = useState(null); // -1 left, 1 right, 2 both, false none
  const [door_locked_array, setDoorLockedArray] = useState([]);
  const [panicCard, setPanicCard] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [isExchangeTarget, setIsExchangeTarget] = useState(false);

  const { websocket } = useWebSocket();
  const [isLoading, setIsLoading] = useState(true);
  const [actionList, setActionList] = useState([]);

  const tableData = players
    ? players.map((player) => ({
        id: player.id,
        name: player.name,
        death: !player.alive,
        position: player.round_position,
        quarantine: player.quarantine,
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
  if (new_card && players) {
    currentUserCardList.push(new_card);
    setNewCard(null);
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

  const userIdToName = (id) => {
    let name = null;
    players?.forEach((player) => {
      if (player.id === id) {
        name = player.name;
      }
    });
    return name;
  };

  const positionToName = (position) => {
    let name = null;
    players?.forEach((player) => {
      if (player.round_position === position) {
        name = player.name;
      }
    });
    return name;
  };

  const nextTargetPlayer = (position) => {
    if (turn_order) {
      return getLeftId(position);
    }

    return getRightId(position);
  };

  function onGameMessage(event) {
    const json = JSON.parse(event.data);
    setMessageType(json.type);
    if (json.type === "game_info") {
      setPlayers(json.game.players);
      setCurrentTurn(json.game.current_turn);
      setTurnPhase(json.game.turn_phase);
      setTurnOrder(json.game.turn_order);
      setIsLoading(false);
      setDoorLockedArray(json.game.locked_doors);

      // buscar la posicion del usuario en el arreglo de jugadores
      let user_position = 0;
      for (let i = 0; i < json.game.players.length; i++) {
        if (json.game.players[i].id === userid) {
          user_position = json.game.players[i].round_position;
        }
      }

      for (let i = 1; i <= json.game.locked_doors.length; i++) {
        if (i === user_position) {
          if (i === json.game.locked_doors.length) {
            if (
              json.game.locked_doors[json.game.locked_doors.length - 1] === 1 &&
              json.game.locked_doors[0] === 1
            ) {
              setDoorLocked(2);
            } else if (
              json.game.locked_doors[json.game.locked_doors.length - 1] === 1 &&
              json.game.locked_doors[0] === 0
            ) {
              setDoorLocked(-1);
            } else if (
              json.game.locked_doors[json.game.locked_doors.length - 1] === 0 &&
              json.game.locked_doors[0] === 1
            ) {
              setDoorLocked(1);
            } else {
              setDoorLocked(false);
            }
          } else {
            if (
              json.game.locked_doors[i - 1] === 1 &&
              json.game.locked_doors[i] === 1
            ) {
              setDoorLocked(2);
            } else if (
              json.game.locked_doors[i - 1] === 1 &&
              json.game.locked_doors[i] === 0
            ) {
              setDoorLocked(-1);
            } else if (
              json.game.locked_doors[i - 1] === 0 &&
              json.game.locked_doors[i] === 1
            ) {
              setDoorLocked(1);
            } else {
              setDoorLocked(false);
            }
          }
        }
      }

      // un nuevo turno se da cuando la fase de turn es Draw
      if (json.game.turn_phase === "Draw") {
        setActionList((actionList) => [
          ...actionList,
          createAction(
            positionToName(json.game.current_turn), //current player
            "new_turn",
            null //siempre debe ser null
          ),
        ]);
      }

      if (json.game.turn_phase === "Exchange") {
        setIsExchangePhase(true);
        setIsPlayPhase(false);
      } else {
        setIsPlayPhase(true);
        setIsExchangePhase(false);
      }

      if (json.game.status === "Finished") {
        setFinished(true);
        setWinner(json.game.winners);
        if (websocket) {
          const messageData = JSON.stringify({
            type: "finished",
          });
          websocket.send(messageData);
        }
      }
    } else if (json.type === "new_turn") {
      setCurrentTurn(json.current_turn);
    } else if (json.type === "draw") {
      if (json.card_type === "PANIC") {
        setPanicCard(json.new_card);
        onCardClicked(json.new_card);
      } else {
        setPanicCard(null);
      }
      setNewCard(json.new_card);
    } else if (json.type === "play") {
      setShowPlayedCard(json.played_card.idtype);
      setCardTarget(json.card_player);
      setPanicCard(null);

      setActionList((actionList) => [
        ...actionList,
        createAction(
          positionToName(current_turn),
          json.played_card.idtype,
          userIdToName(json.card_target)
        ),
      ]);
    } else if (json.type === "discard") {
      setShowPlayedCard(json.played_card.idtype);
      setTurnPhase(json.turn_phase);

      setActionList((actionList) => [
        ...actionList,
        createAction(
          positionToName(current_turn),
          "discard",
          null //should be null
        ),
      ]);
    } else if (json.type === "try_defense") {
      setLastPlayedCard(json.played_card);
      setIsPlayPhase(false);
      if (json.target_player === 0 && last_played_card !== null) {
        if (last_played_card === null) {
          const messageData = JSON.stringify({
            type: "defense",
            target_player: 0,
            played_defense: 0,
            last_played_card: 0,
          });
          websocket.send(messageData);
        } else {
          const messageData = JSON.stringify({
            type: "defense",
            target_player: 0,
            played_defense: 0,
            last_played_card: last_played_card.id,
          });
          setActionList((actionList) => [
            ...actionList,
            createAction(
              positionToName(current_turn),
              json.played_card.idtype,
              userIdToName(json.card_target)
            ),
          ]);

          websocket.send(messageData);
        }
      } else {
        setCardTarget(json.target_player);
        setDefendedBy(json.defended_by);
        setIsSomeoneBeingDefended(true);
      }
    } else if (json.type === "defense") {
      setIsSomeoneBeingDefended(false);
      setCardTarget(null);
      setDefendedBy([]);
      setIsPlayPhase(false);
      setPanicCard(null);
      if (json.target_player === 0 || json.played_defense === 0) {
        setShowPlayedCard(json.last_played_card.idtype);
      } else {
        // setPlayedDefense(json.played_defense);
        setShowPlayedCard(json.played_defense.idtype);

        setActionList((actionList) => [
          ...actionList,
          createAction(
            userIdToName(json.target_player), //el que defendio esta su id
            json.played_defense.idtype,
            positionToName(current_turn) // el atacante es el current turn
          ),
        ]);
      }
    } else if (json.type === "exchange") {
      setCardTarget(json.target_player);
      setLastChosenCard(json.last_chosen_card);
      setIsExchangeTarget(true);
    } else if (json.type === "exchange_defense") {
      setIsExchangeTarget(true);
      setCardTarget(json.target_player);
      setDefendedBy(json.defended_by);
      setIsSomeoneBeingDefended(true);
      setLastChosenCard(json.last_chosen_card);
      setExchangeRequester(json.exchange_requester);
    } else if (json.type === "exchange_end") {
      //add the action after the exchange
      setActionList((actionList) => [
        ...actionList,
        createAction(
          userIdToName(exchange_requester),
          "exchange",
          userIdToName(card_target)
        ),
      ]);

      setIsExchangeTarget(false);
      setClickedCard(null);
      setPlayedCard(null);
      setIsSomeoneBeingDefended(false);
      setCardTarget(null);
      setDefendedBy([]);
      setLastChosenCard(null);
      setExchangeRequester(null);
      setIsExchangePhase(false);
    } else if (json.type === "show_card") {
      const targetArray = json.target;

      for (const target of targetArray) {
        if (target === userid) {
          setShowOpponentCard(true);
          setCarsToShow(json.cards);
          setPlayerName(json.player_name);
        }
      }
    }
  }

  if (websocket) {
    websocket.onmessage = onGameMessage;
  }

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
            <FinishedAlert winner={winner} gameId={gameId} />
          </Grid>
        )}

        {userid === positionToId(current_turn) &&
          !finished &&
          turn_phase !== "Exchange" && (
            <Alert
              severity="success"
              style={{
                position: "absolute",
                top: "5%",
                left: "2%",
              }}
            >
              Es tu turno, {players.find((player) => player.id === userid).name}
              !
            </Alert>
          )}

        {userid === positionToId(current_turn) &&
          !finished &&
          turn_phase === "Exchange" && (
            <Alert
              severity="success"
              style={{
                position: "absolute",
                top: "5%",
                left: "2%",
              }}
            >
              Fase de intercambio,{" "}
              {players.find((player) => player.id === userid).name}!
            </Alert>
          )}
        {userid === card_target && turn_phase !== "Exchange" && !finished && (
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
        {userid === card_target && turn_phase === "Exchange" && !finished && (
          <Alert
            severity="warning"
            style={{
              position: "absolute",
              top: "5%",
              left: "2%",
            }}
          >
            El jugador{" "}
            {players.find((player) => player.id === exchange_requester).name} te
            ha solicitado intercambiar,{" "}
            {players.find((player) => player.id === userid).name}!!
          </Alert>
        )}
        {isLoading ? (
          // Mostrar el mensaje de carga si loading es true
          <p>Loading...</p>
        ) : (
          // Mostrar los datos del juego si loading es false
          <>
            {true === checkIfDead() && !finished ? (
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
              turnExchange={card_target}
              turnPhase={turn_phase}
              the_thing_id={
                players.find((player) => player.role === "The Thing").id
              }
              door_locked={door_locked_array}
              currentUserDoorLocked={door_locked}
              lastCardPlayed={showPlayedCard}
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
                cardList={carsToShow}
                opponentName={player_name}
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
                  <div>
                    {door_locked === -1 ? (
                      <img
                        src={left_door}
                        alt="door"
                        style={{
                          background: "transparent",
                          backgroundColor: "transparent",
                          width: 40,
                          marginBottom: 5,
                          marginLeft: -620,
                        }}
                      />
                    ) : door_locked === 1 ? (
                      <img
                        src={right_door}
                        alt="door"
                        style={{
                          background: "transparent",
                          backgroundColor: "transparent",
                          width: 40,
                          marginBottom: 5,
                          marginRight: -400,
                        }}
                      />
                    ) : door_locked === 2 ? (
                      <>
                        <img
                          src={left_door}
                          alt="door"
                          style={{
                            background: "transparent",
                            backgroundColor: "transparent",
                            width: 40,
                            marginBottom: 5,
                            marginRight: 500,
                          }}
                        />
                        <img
                          src={right_door}
                          alt="door"
                          style={{
                            background: "transparent",
                            backgroundColor: "transparent",
                            width: 40,
                            marginBottom: 5,
                            marginRight: 120,
                          }}
                        />
                      </>
                    ) : null}
                  </div>

                  <Hand
                    cardList={currentUserCardList}
                    defense={defended_by}
                    target_player={card_target}
                    isSomeoneBeingDefended={isSomeoneBeingDefended}
                    role={players.find((player) => player.id === userid).role}
                    isPlayPhase={isPlayPhase}
                    cardTargetRole={
                      card_target !== null && exchange_requester !== null
                        ? card_target !== userid
                          ? players.find((player) => player.id === card_target)
                              .role
                          : players.find(
                              (player) => player.id === exchange_requester
                            ).role
                        : null
                    }
                    panicCard={panicCard}
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
                    label={
                      players.find((player) => player.id === userid).name +
                      " - " +
                      players.find((player) => player.id === userid).role
                    }
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
                  messageType={messageType}
                  target_player={card_target}
                  isDefended={isSomeoneBeingDefended}
                  next_target_id={nextTargetPlayer(current_turn)}
                  last_played_card={last_played_card}
                  lastChosenCard={last_chosen_card}
                  turnPhase={turn_phase}
                  setIsSomeoneBeingDefended={setIsSomeoneBeingDefended}
                  exchangeRequester={exchange_requester}
                  isNotPanicCard={panicCard === null}
                  lastCardPlayedForSeduction={showPlayedCard}
                  currentUserDoorLocked={door_locked}
                  turnOrder={turn_order}
                  isExchangeTarget={isExchangeTarget}
                />
              </div>
            </Box>
            <ActionLog listOfActions={actionList} />
          </>
        )}
      </div>
      <GameChat />
    </div>
  );
};

export default Game;
