import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { GameModeContextProvider } from "./components/Context/gameModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GameModeContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </GameModeContextProvider>
  </React.StrictMode>,
);
