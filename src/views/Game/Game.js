import Hand from "../../components/GameComps/Hand";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import Buttons from "../../components/GameComps/GameButtons";
import "./Game.css";
import image from "../Background/xd.svg";    

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Game = () => {
  const { gameId } = useParams();
  const [players, setPLayers] = useState([]);

  let players_example = [
    { name: "Player 2" },
    { name: "Player 2" },
    { name: "Player 3" },
    { name: "Player 4" },
    { name: "Player 5" },
    { name: "Player 6" },
    { name: "Player 7" },
    { name: "Player 8" },
    { name: "Player 9" },
    { name: "Player 10" },
    { name: "Player 11" },
  ];

  const buildCircle = (cnt_players) => {
    const num = cnt_players; //Number of Square to be generate
    const type = 1;
    let radius = "415"; //distance from center
    let start = 169; //shift start from 0
    let slice;

    switch (num) {
      case 4:
        slice = (185 * type) / num;
        start = 200;
        break;
      case 5:
        slice = (200 * type) / num;
        start = 190;
        break;
      case 6:
        slice = (239 * type) / num;
        break;
      case 7:
        slice = (236 * type) / num;
        break;
      case 8:
        slice = (230 * type) / num;
        break;
      case 9:
        slice = (227 * type) / num;
        break;
      case 10:
        slice = (224 * type) / num;
        break;
      case 11:
        slice = (222 * type) / num;
        break;
      default:
        slice = (220 * type) / num;
        break;
    }

    let items = [];
    let i;
    for (i = 0; i < num; i++) {
      let rotate = slice * i + start;
      let rotateReverse = rotate * -1;

      items.push({
        radius: radius,
        rotate: rotate,
        rotateReverse: rotateReverse,
        name: players_example[i].name,
      });
    }
    setPLayers(items);
  };

  useEffect(() => {
    // requests here
    // hay q ver como hacer, si setter la lista de jugadores a un arreglo (como players_example) o a un estado
    // (con estados no me funca)

    buildCircle(8); // pass the number of players here
  }, []);

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
        <div className="circle">
          <div className="circle-hold">
            {players.map(function (value, index) {
              return <UserAvatar css={value} name={value.name} key={index} />;
            })}
          </div>
        </div>
        <Box>
          <Grid container spacing={10}>
            <Grid item xs={6} md={20}>
              <Hand />
            </Grid>
          </Grid>
          <div
            style={{
              position: "relative",
              left: "50%",
              transform: "translate(16%, 0%)",
            }}
          >
            <Buttons />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Game;
