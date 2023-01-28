import { ArrowUpIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Link, Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Footer from "../pages/shared/Footer/Footer";
import Navbar from "../pages/shared/Navbar/Navbar";

export default function Layout() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {location.pathname === "/" ? (
        <ScrollToTop>
          <Footer />
        </ScrollToTop>
      ) : (
        <Footer />
      )}
      <ScrollRestoration />
    </>
  );
}
