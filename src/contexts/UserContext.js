import { createContext, useState, useCallback } from "react";

import { CardHasTarget } from "../utils/CardHandler";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUserName] = useState(null);
  const [roomid, setRoomId] = useState(null);
  const [userid, setUserId] = useState(null);
  const [clickedCard, setClickedCard] = useState(null);
  const [targetsEnable, setTargetsEnable] = useState(null);

  const onCardClicked = useCallback(
    (card) => {
      if (clickedCard?.id === card?.id) {
        setClickedCard(null);
        setTargetsEnable(false); 
      } else {
        setClickedCard(card);
        setTargetsEnable(CardHasTarget(card?.idtype));
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
