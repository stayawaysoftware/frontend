import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_WS } from "../utils/ApiTypes";
import { UserContext } from "./UserContext";

/*
 * WebsocketContext
 * Contexto para poder usar el websocket en cualquier componente
 * la funcion createWebSocket se usa para crear el websocket
 *   pero solo cuando se navega a Room
 * Para entender como usar el websocket se recomienda ver el componente Chat
 * El manejo "lógico" de los type se hace en cada componente
 *
 */

export const WebsocketContext = createContext();

export function useWebSocket() {
  return useContext(WebsocketContext);
}

export const WebsocketContextProvider = ({ children }) => {
  const { userid } = useContext(UserContext);
  const [websocket, setWebsocket] = useState(null);

  const createWebSocket = (room_id) => {
    const ws = new WebSocket(`${BASE_WS}/${room_id}/${userid}`);
    setWebsocket(ws);
  };

  useEffect(() => {
    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, [userid, websocket]);

  const contextValue = { websocket, createWebSocket };

  return (
    <WebsocketContext.Provider value={contextValue}>
      {children}
    </WebsocketContext.Provider>
  );
};
