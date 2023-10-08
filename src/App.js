import "./App.css";
import React, { useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Home from "./views/Home/Home";
import Register from "./views/Register/Register";
import PageNotFound from "./views/PageNotFound/PageNotFound";
import Room from "./views/Room/Room";
import Game from "./views/Game/Game";

const defaultTheme = createTheme();

const routes = createBrowserRouter([
  {
    name: "Home",
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />,
  },
  {
    name: "Room",
    path: "/room/:roomId",
    element: <Room />,
  },
  {
    name: "Game",
    path: "/game/:gameId",
    element: <Game />,
  },
]);

function App() {
  const { username, userid } = useContext(UserContext);

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  });

  const alertUser = (event) => {
    event.preventDefault();
    //con axios no funciona, no se porque xdnt
    fetch(`http://localhost:8000/users/${userid}`, {
      method: "DELETE",
    });
    event.returnValue = "";
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        {!!username ? <RouterProvider router={routes} /> : <Register />}
      </div>
    </ThemeProvider>
  );
}

export default App;
