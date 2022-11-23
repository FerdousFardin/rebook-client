import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";

export default function Main() {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer />
    </>
  );
}
