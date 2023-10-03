import Hand from "../../components/GameComps/Hand";
import Buttons from "../../components/GameComps/GameButtons";
import image from "../Background/xd.svg";
import GameTable from "../../components/GameTable/GameTable";
import Deck from "../../components/GameComps/Deck";
import DescPile from "../../components/GameComps/DescPile";

import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

const lastCard = 200;

const Game = () => {
  const { gameId } = useParams();
  const { userid } = useContext(UserContext);

  //game data
  const [gameData, setGameData] = useState(null);
  const [gamePlayers, setGamePlayers] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [playerHand, setPlayerHand] = useState([]);
  const [loading, setLoading] = useState(true);
  const [forceRenderAlive, setForceRenderAlive] = useState(0);
  const [forceRender, setForceRender] = useState(0);


  useEffect(() => {
    const getGameData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/game/${gameId}`
        );
        const data = response.data;
        setGameData(data);
        setGamePlayers(data.players);
        setCurrentTurn(data.current_turn);
        // setPlayerHand(data.players.find((player) => player.id === userid).hand);
        setLoading(false);
      } catch (error) {
        // Manejar errores de la solicitud
        console.error("Error al obtener los datos del juego:", error);
      }
    };
    getGameData();
    console.log("game data es", gameData);
    console.log("turno es", currentTurn);

    const interval = setInterval(getGameData, 1000);

    return () => clearInterval(interval);
  }, [gameId]);

  const handleForceRenderAlive = () => {
    setForceRenderAlive(calcAlivePlayers());
  };

  const handleForceRender = () => {
    setForceRender(currentTurn);
  };

  const calcAlivePlayers = () => {
    let alivePlayers = 0;
    gameData.players.forEach((player) => {
      if (player.alive) {
        alivePlayers++;
      }
    }
    );
    return alivePlayers;
  };


  const gameDataToTableData = (gameData) => {
    let tableData = [];
    gameData.players.forEach((player) => {
      tableData.push({
        id: player.id,
        name: player.name,
        death: !player.alive,
        position: player.round_position,
      });
    });
    console.log("table data es", tableData); 
    return tableData;
  };

  const positionToId = (position) => {
    // console.log("game players es", gamePlayers);
    let id = null;
    gamePlayers.forEach((player) => {
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
      const leftPos = (position === 1) ? n : position - 1;
      const leftId = positionToId(leftPos);
      //check if leftid is alive
      if (gameData.players.find((player) => player.id === leftId).alive) {
        return leftId;
      } else {
        position = leftPos;
      }      
    }
  
  }

  const getRightId = (position) => {
    const n = gamePlayers.length;
    // Si la posición es n, entonces la posición derecha es 1
    // Si no, la posición derecha es la posición actual + 1
    while (1) {
      const rightPos = (position === n) ? 1 : position + 1;
      const rightId = positionToId(rightPos);
      //check if rightid is alive
      if (gameData.players.find((player) => player.id === rightId).alive) {
        return rightId;
      } else {
        position = rightPos;
      }
    }
  }


  const idToHandOfIdType = (id) => {
    let hand = [];
    hand = gameData.players.find((player) => player.id === id).hand;
    //hand to idtype hand
    let idTypeHand = [];
    hand.forEach((card) => {
      idTypeHand.push(card.idtype);
    });
    idTypeHand.sort();
    console.log("idtypehand es", idTypeHand);
    return idTypeHand;
  }
  
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
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
            Your Turn!
          </Alert>
          ) : (
          <h1> </h1>
        )}
        {loading ? (
          // Mostrar el mensaje de carga si loading es true
          <p>Loading...</p>
        ) : (
          // Mostrar los datos del juego si loading es false
          <>
            <GameTable
              players_example={gameDataToTableData(gameData)}
              currentTurn={currentTurn}
              forceRender={forceRender}
              forceRenderAlive={forceRenderAlive}
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
                  <DescPile lastCard={lastCard} />
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
                  <Hand cardList={idToHandOfIdType(userid)} />
                </Grid>
              </Grid>
              <div
                style={{
                  position: "relative",
                  left: "50%",
                  transform: "translate(16%, 0%)",
                  marginTop: 0,
                }}
              >
                <Buttons 
                  current_player={positionToId(currentTurn)} 
                  gameId={gameId}
                  left_id = {getLeftId(currentTurn)}
                  right_id = {getRightId(currentTurn)}  
                />
              </div>
            </Box>
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
