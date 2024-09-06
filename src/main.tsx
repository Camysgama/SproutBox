import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./global.css";
import { routes } from "./routes.tsx";
import { UserContextProvider } from "./context/user-context/user-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={routes}></RouterProvider>
    </UserContextProvider>
  </React.StrictMode>,
);
