import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    name: "Register",
    path: "/register",
    element: <Register />,
  },
  {
    name: "Room",
    path: "/room",
    element: <Room />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
