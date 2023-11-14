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
  door_locked,
  currentUserDoorLocked,
  lastCardPlayed,
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

        let cnt_door_locked = 0;

        for (let j = 1; j <= door_locked.length; j++) {
          if (j === players[i].position) {
            if (j === door_locked.length) {
              if (door_locked[j - 1] === 1 && door_locked[0] === 1) {
                cnt_door_locked = 2;
              } else if (door_locked[j - 1] === 1 && door_locked[0] === 0) {
                cnt_door_locked = 1;
              } else if (door_locked[j - 1] === 0 && door_locked[0] === 1) {
                cnt_door_locked = -1;
              } else {
                cnt_door_locked = 0;
              }
            } else {
              if (door_locked[j - 1] === 1 && door_locked[j] === 1) {
                cnt_door_locked = 2;
              } else if (door_locked[j - 1] === 1 && door_locked[j] === 0) {
                cnt_door_locked = 1;
              } else if (door_locked[j - 1] === 0 && door_locked[j] === 1) {
                cnt_door_locked = -1;
              } else {
                cnt_door_locked = 0;
              }
            }
          }
        }

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
          quarentine: players[i].quarentine,
          cnt_door_locked: cnt_door_locked,
        });
      }
      setPlayers(items);
    },
    [currentTurn, door_locked]
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
  }, [buildCircle, playersTable, userid, door_locked]);

  const handlePlayCard = (id) => {
    if (websocket) {
      const messageData = JSON.stringify({
        type: "play",
        played_card: clickedCard.id,
        card_target: id,
      });
      websocket.send(messageData);
    }
    console.log("card played", clickedCard);
    console.log("target", id);

    setPlayedCard(clickedCard);
    onCardClicked(null);
    setTargetId(id);
  };

  const handleExchange = (id) => {
    if (websocket) {
      const messageData = JSON.stringify({
        type: "exchange",
        target_player: id,
        chosen_card: clickedCard.id,
      });
      websocket.send(messageData);
    }
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
        if (clickedCard.idtype === 5) {
          if (
            (id === left_id && currentUserDoorLocked === -1) ||
            (id === right_id && currentUserDoorLocked === 1)
          ) {
            return () => handlePlayCard(id);
          }
        } else {
          if (
            ((id === left_id && currentUserDoorLocked !== -1) ||
              (id === right_id && currentUserDoorLocked !== 1)) &&
            currentUserDoorLocked !== 2
          ) {
            return () => handlePlayCard(id);
          }
        }
      } else if (
        clickedCard &&
        CardHasTarget(clickedCard.idtype) === CntTarget.ALL
      ) {
        if (
          (id === left_id && currentUserDoorLocked === -1) ||
          (id === right_id && currentUserDoorLocked === 1)
        ) {
          return null;
        } else {
          return () => handlePlayCard(id);
        }
      }
    } else if (
      turnPhase === "Exchange" &&
      currentTurn === userid &&
      clickedCard &&
      (lastCardPlayed === 11 || lastCardPlayed === 29)
    ) {
      if (
        (id === left_id && currentUserDoorLocked === -1) ||
        (id === right_id && currentUserDoorLocked === 1)
      ) {
        return null;
      } else {
        return () => handleExchange(id);
      }
    }

    return null;
  };

  return (
    <div className="circle">
      {players.length ? (
        <div className="circle-hold">
          {players.map(
            (
              { id, name, death, turn, quarentine, cnt_door_locked, style },
              index
            ) => {
              return (
                <UserAvatar
                  key={id}
                  css={{ ...style }}
                  name={name}
                  death={death}
                  turn={currentTurn === id}
                  onClick={getUserFunction(id)}
                  turnDefense={turnDefense === id}
                  quarentine={quarentine}
                  door_locked={cnt_door_locked} // if -1 left door, if 1 right door, if 2 double door, if 0 or false no door
                />
              );
            }
          )}
        </div>
      ) : null}
    </div>
  );
};

export default GameTable;
