import { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";

import { CntTarget, CardHasTarget } from "../../utils/CardHandler";
import { UserAvatar } from "../UserAvatar";
import { UserContext } from "../../contexts/UserContext";
import "./GameTable.css";
import { useWebSocket } from "../../contexts/WebsocketContext";

const GameTable = ({
  playersTable,
  currentTurn,
  left_id,
  right_id,
  turnDefense,
  isSomeoneBeingDefended,
  turnPhase,
  the_thing_id,
}) => {
  const { gameId } = useParams();
  const {
    userid,
    targetsEnable,
    clickedCard,
    onCardClicked,
    setPlayedCard,
    setTargetId,
  } = useContext(UserContext);
  const [players, setPlayers] = useState([]);
  const { websocket } = useWebSocket();

  const buildCircle = useCallback(
    (players) => {
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
          style: {
            radius: radius,
            rotate: rotate,
            rotateReverse: rotateReverse,
          },
          id: players[i].id,
          name: players[i].name,
          death: players[i].death,
          turn: players[i].position === currentTurn, // si es el turno del usuario
        });
      }
      setPlayers(items);
    },
    [currentTurn]
  );

  useEffect(() => {
    const sortPlayers = () => {
      let sorted_players = [];
      let i;
      playersTable.sort((a, b) => {
        return a.position - b.position;
      });
      for (i = 0; i < playersTable.length; i++) {
        if (playersTable[i].id === userid) {
          // sorted_players.push(playersTable[i]);
          break;
        }
      }
      for (let j = i - 1; j >= 0; --j) {
        if (playersTable[j] === undefined) console.log("undefined " + j);
        sorted_players.push(playersTable[j]);
      }
      for (let j = playersTable.length - 1; j > i; --j) {
        if (playersTable[j] === undefined) console.log("undefined " + j);
        sorted_players.push(playersTable[j]);
      }
      buildCircle(sorted_players);
    };
    sortPlayers();
  }, [buildCircle, playersTable, userid]);

  const handlePlayCard = (id) => {
    if (websocket) {
      const messageData = JSON.stringify({
        type: "play",
        played_card: clickedCard.id,
        card_target: id,
      });
      websocket.send(messageData);
    }
    setPlayedCard(clickedCard);
    onCardClicked(null);
    setTargetId(id);
  };

  const getUserFunction = (id) => {
    if (
      targetsEnable &&
      currentTurn === userid &&
      !isSomeoneBeingDefended &&
      turnPhase !== "Exchange"
    ) {
      if (
        clickedCard &&
        CardHasTarget(clickedCard.idtype) === CntTarget.ADJACENT
      ) {
        if (id === left_id || id === right_id) {
          return () => handlePlayCard(id);
        }
      } else if (
        clickedCard &&
        CardHasTarget(clickedCard.idtype) === CntTarget.ALL
      ) {
        return () => handlePlayCard(id);
      }
    return null;
    }
  };

  return (
    <div className="circle">
      {players.length ? (
        <div className="circle-hold">
          {players.map(({ id, name, death, turn, style }, index) => {
            return (
              <UserAvatar
                key={id}
                css={{ ...style }}
                name={name}
                death={death}
                turn={currentTurn === id}
                onClick={getUserFunction(id)}
                turnDefense={turnDefense === id}
                quarentine={false}
                door_locked={0} // if -1 left door, if 1 right door, if 2 double door, if 0 or false no door
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default GameTable;
