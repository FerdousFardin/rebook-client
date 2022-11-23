import React from "react";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <>
      <nav />
      <Outlet />
      <footer />
    </>
  );
}
