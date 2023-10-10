import { useContext, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import { useGame } from "../../hooks/useGame";

import Hand from "../../components/GameComps/Hand";
import Buttons from "../../components/GameComps/GameButtons";
import image from "../Background/xd.svg";
import GameTable from "../../components/GameTable/GameTable";
import Deck from "../../components/GameComps/Deck";
import DescPile from "../../components/GameComps/DescPile";
import FinishedAlert from "../../components/FinishedAlert/FinishedAlert";

import { Box, Grid, Alert, Chip } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";

const Game = () => {
  const { gameId } = useParams();
  const { userid } = useContext(UserContext);

  //game data
  const [finished, setFinished] = useState(true);
  const [forceRender, setForceRender] = useState(0);

  const { data: gameData, isLoading } = useGame(gameId);
  console.log({ gameData });
  const {
    players: gamePlayers = [],
    current_turn: currentTurn,
    last_played_card,
    alive_players = 0,
  } = useMemo(() => gameData ?? {}, [gameData]);

  const { tableData, currentUserCardList } = useMemo(() => {
    const tableData = [];
    if (gamePlayers) {
      gamePlayers.forEach((player) => {
        tableData.push({
          id: player.id,
          name: player.name,
          death: !player.alive,
          position: player.round_position,
        });
      });
    }

    let currentUserCardList = [];
    if (gamePlayers) {
      currentUserCardList = gamePlayers
        .find((player) => player.id === userid)
        ?.hand.sort(function (a, b) {
          return a.id - b.id;
        });
    }

    return {
      tableData,
      currentUserCardList,
    };
  }, [gamePlayers, userid]);

  const handleForceRender = () => {
    setForceRender(currentTurn);
  };

  const positionToId = (position) => {
    // console.log("game players es", gamePlayers);
    let id = null;
    gamePlayers?.forEach((player) => {
      if (player.round_position === position) {
        id = player.id;
      }
    });
    return id;
  };

  const getLeftId = (position) => {
    const n = gamePlayers.length;
    //must return the next valid id, considering if the player is alive or not
    while (1) {
      const leftPos = position === 1 ? n : position - 1;
      const leftId = positionToId(leftPos);
      //check if leftid is alive
      if (gamePlayers?.find((player) => player.id === leftId).alive) {
        return leftId;
      } else {
        position = leftPos;
      }
    }
  };

  const getRightId = (position) => {
    const n = gamePlayers.length;
    // Si la posición es n, entonces la posición derecha es 1
    // Si no, la posición derecha es la posición actual + 1
    while (1) {
      const rightPos = position === n ? 1 : position + 1;
      const rightId = positionToId(rightPos);
      //check if rightid is alive
      if (gamePlayers?.find((player) => player.id === rightId).alive) {
        return rightId;
      } else {
        position = rightPos;
      }
    }
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
            {gameData.players.find((player) => player.id === userid).name}!
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
              forceRender={forceRender}
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
                      gameData.players.find((player) => player.id === userid)
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
                  gamePlayersName={gamePlayers[0]?.name}
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
