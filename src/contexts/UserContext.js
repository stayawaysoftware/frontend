import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUserName] = useState(null);
  const [roomid, setRoomId] = useState(null);
  const [userid, setUserId] = useState(null);
  const [clickedCard, setClickedCard] = useState(null);

  return (
    <UserContext.Provider
      value={{ username, setUserName, roomid, setRoomId, userid, setUserId,
        clickedCard, setClickedCard }}
    >
      {children}
    </UserContext.Provider>
  );
};
