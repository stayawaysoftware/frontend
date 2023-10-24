import { createContext, useState, useCallback } from "react";

import { CardHasTarget, CntTarget } from "../utils/CardHandler";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUserName] = useState(null);
  const [roomid, setRoomId] = useState(null);
  const [userid, setUserId] = useState(null);
  const [clickedCard, setClickedCard] = useState(null);
  const [playedCard, setPlayedCard] = useState(null);
  const [targetsEnable, setTargetsEnable] = useState(null);
  const [targetId, setTargetId] = useState(null);

  const onCardClicked = useCallback(
    (card) => {
      if (clickedCard?.id === card?.id) {
        setClickedCard(null);
        setTargetsEnable(false);
      } else {
        setClickedCard(card);
        if (
          CardHasTarget(card?.idtype) === CntTarget.ADJACENT ||
          CardHasTarget(card?.idtype) === CntTarget.ALL
        ) {
          setTargetsEnable(true);
        } else {
          setTargetsEnable(false);
        }
      }
    },
    [clickedCard, setClickedCard]
  );

  return (
    <UserContext.Provider
      value={{
        username,
        setUserName,
        roomid,
        setRoomId,
        userid,
        setUserId,
        clickedCard,
        onCardClicked,
        targetsEnable,
        playedCard,
        setPlayedCard,
        targetId,
        setTargetId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
