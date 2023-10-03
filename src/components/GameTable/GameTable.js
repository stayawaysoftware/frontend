import UserAvatar from "../UserAvatar/UserAvatar";
import "./GameTable.css";
import { UserContext } from "../../contexts/UserContext";

import React, { useEffect, useState, useContext } from "react";

const GameTable = ({ players_example, currentTurn, forceRender, forceRenderAlive }) => {
  const { userid } = useContext(UserContext);
  const [players, setPLayers] = useState([]);

  const buildCircle = (players) => {
    const num = players.length; //Number of Square to be generate
    const type = 1;
    let radius = "415"; //distance from center
    let start = 169; //shift start from 0
    let slice;

    switch (num) {
      case 3:
        slice = (200 * type) / num;
        start = 203;
        break;
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
        name: players[i].name,
        death: players[i].death,
        turn: players[i].position === currentTurn, // si es el turno del usuario
      });
    }
    setPLayers(items);
  };

  useEffect(() => {
    const sortPlayers = () => {
      let sorted_players = [];
      let i;
      players_example.sort((a, b) => {
        return a.position - b.position;
      });
      for (i = 0; i < players_example.length; i++) {
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
      buildCircle(sorted_players);
    };
    sortPlayers();
  }, [forceRender, players_example, currentTurn, forceRenderAlive]);

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
                turn={value.turn}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default GameTable;
