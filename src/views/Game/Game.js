import Hand from "../../components/GameComps/Hand";
import Buttons from "../../components/GameComps/GameButtons";
import image from "../Background/xd.svg";
import GameTable from "../../components/GameTable/GameTable";
import Deck from "../../components/GameComps/Deck";

import React from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const cardList = [200, 201, 202, 203, 3];

const Game = () => {
  const { gameId } = useParams();

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
        <GameTable />
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
            <Buttons current_player={5}/>
          </div>
        </Box>
      </div>
    </div>
    );
  };

  export default Game;
