import UserAvatar from "../UserAvatar/UserAvatar";
import "./GameTable.css";
import { UserContext } from "../../contexts/UserContext";

import React, { useEffect, useState, useContext } from "react";

const GameTable = () => {
  const { userid } = useContext(UserContext);
  const [players, setPLayers] = useState([]);
  const [orderedPlayers, setOrderedPLayers] = useState([]);

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
        name: orderedPlayers[i].name,
        death: orderedPlayers[i].death,
      });
    }
    setPLayers(items);
  };

  // dependiendo el user id ordenar el arreglo de players
  const sortPlayers = () => {
    let sorted_players = [];
    let i;
    for (i = 1; i < players_example.length; i++) {
      if (players_example[i].id === userid) {
        // sorted_players.push(players_example[i]);
        break;
      }
    }
    for (let j = i - 1; j >= 0; --j) {
      if (players_example[j] === undefined) console.log("undefined " + j);
      sorted_players.push(players_example[j]);
    }
    for (let j = players_example.length - 1; j > i; --j) {
      if (players_example[j] === undefined) console.log("undefined " + j);
      sorted_players.push(players_example[j]);
    }
    setOrderedPLayers(sorted_players);
  };

  useEffect(() => {
    sortPlayers();
    if (orderedPlayers.length > 0) buildCircle(orderedPlayers.length);
  }, [orderedPlayers]);

  return (
    <div className="circle">
      {players.length ? (
        <div className="circle-hold">
          {players.map(function (value, index) {
            return (
              <UserAvatar
                css={value}
                name={value.name}
                key={index}
                death={value.death}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default GameTable;
