import "./App.css";
import React, { useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

import Home from "./views/Home/Home";
import Register from "./views/Register/Register";
import PageNotFound from "./views/PageNotFound/PageNotFound";
import Room from "./views/Room/Room";
import Game from "./views/Game/Game";

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
    <div className="App">
      {!!username ? <RouterProvider router={routes} /> : <Register />}
    </div>
  );
}

export default App;
