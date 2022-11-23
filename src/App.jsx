import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
// import { routes } from "./routes/routes";0

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
