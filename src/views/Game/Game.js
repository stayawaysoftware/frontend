import Hand from "../../components/GameComps/Hand";
import Buttons from "../../components/GameComps/GameButtons";
import image from "../Background/xd.svg";
import GameTable from "../../components/GameTable/GameTable";
import Deck from "../../components/GameComps/Deck";
import DescPile from "../../components/GameComps/DescPile";

import React from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

const cardList = [200, 201, 202, 3, 202];
const lastCard = 3;
const descPile = [];


const Game = () => {
  const { gameId } = useParams();
  const { userid } = useContext(UserContext);

  let players_example = [
    { id: 1, name: "Player 1", death: false },
    { id: 2, name: "Player 2", death: false },
    { id: 3, name: "Player 3", death: true },
    { id: 4, name: "Player 4", death: false },
    { id: 5, name: "Player 5", death: false },
    { id: 6, name: "Player 6", death: false },
    { id: 7, name: "Player 7", death: false },
    { id: 8, name: "Player 8", death: true },
    { id: 9, name: "Player 9", death: false },
    { id: 10, name: "Player 10", death: false },
    { id: 11, name: "Player 11", death: false },
    { id: 12, name: "Player 12", death: false },
  ];

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
        <GameTable players_example={players_example} />
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
              <DescPile lastCard={lastCard} descPile={descPile} />
            </Grid>
          </Grid>
          <div
            style={{
              position: "relative",
              left: "10%",
              transform: "translate(16%, 0%)",
              marginBottom: "-70%",
            }}
          >
          </div>
        </Box>
        <Box>  
          <Grid container spacing={2}>
            <Grid item xs={6} md={20}>
              <Hand cardList={cardList} />
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
            <Buttons current_player={userid} />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Game;