import React, { createContext, useState } from "react";

export const JoinRoomContext = createContext();

export const JoinRoomProvider = ({ children }) => {
  const [roomid, setRoomId] = useState(null);

  return (
    <JoinRoomContext.Provider value={{ roomid, setRoomId }}>
      {children}
    </JoinRoomContext.Provider>
  );
};
