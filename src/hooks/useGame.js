/* import axios from "axios";

import { useQuery } from "@tanstack/react-query";

const fetchGame = async (gameId) => {
  try {
    const response = await axios.get(`http://localhost:8000/game/${gameId}`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    // Manejar errores de la solicitud
    console.error("Error al obtener los datos del juego:", error);
  }
};

export const useGame = (gameId) =>
  useQuery(["game", gameId], () => fetchGame(gameId), {
    refetchInterval: 1000,
  }); */
