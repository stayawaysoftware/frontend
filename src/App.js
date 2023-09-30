import "./App.css";
import React, { useContext } from "react";
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
    path: "/game",
    element: <Game />,
  },
]);

function App() {
  const { username } = useContext(UserContext);

  return (
    <div className="App">
      {!!username ? <RouterProvider router={routes} /> : <Register />}
    </div>
  );
}

export default App;
