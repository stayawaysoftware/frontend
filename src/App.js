import "./App.css";
import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContext } from "./UserContext";

import Home from "./views/Home/Home";
import Register from "./views/Register/Register";
import PageNotFound from "./views/PageNotFound/PageNotFound";
import Room from "./views/Room/Room";

const routes = createBrowserRouter([
  {
    name: "Home",
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />,
  },
  {
    name: "Room",
    path: "/room:roomId",
    element: <Room />,
  },
]);

function App() {
  const { user } = useContext(UserContext);

  return (
    <div className="App">
      {!!user ? <RouterProvider router={routes} /> : <Register />}
    </div>
  );
}

export default App;
