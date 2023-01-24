import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PrimaryBtn from "../../../components/Buttons/PrimaryBtn";
import { AuthContext } from "../../../context/AuthProvider";
import useWindowSize from "../../../hooks/useWindowSize";
import Search from "../../../components/Search/Search";
import { motion } from "framer-motion";
import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
export default function Navbar() {
  const { user, logoutUser, loadingState } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  let [width] = useWindowSize();
  const location = useLocation();
  const hoverStyles = width < 1024 ? { translateX: 1.25 } : { scale: 1.02 };
  const activeClass = "text-primary underline underline-offset-2";
  const navItems = (
    <>
      <motion.span whileHover={hoverStyles}>
        <Link
          onClick={() => setIsOpen(false)}
          to={"/"}
          className={`px-3 text-lg lg:text-sm py-2 mx-3 mt-2 rounded-md lg:mt-0 duration-300 transform transition-colors font-medium ${
            location.pathname === "/"
              ? activeClass
              : "text-gray-700  dark:text-gray-200 hover: hover:underline underline-offset-2 dark:hover:bg-gray-700 hover:text-primary"
          }`}
        >
          Home
        </Link>
      </motion.span>
      {user?.uid && (
        <motion.span whileHover={hoverStyles}>
          <Link
            onClick={() => setIsOpen(false)}
            to={"/dashboard"}
            className={`px-3 text-lg lg:text-sm py-2 mx-3 mt-2 rounded-md lg:mt-0 duration-300 transform transition-colors font-medium ${
              location.pathname === "/dashboard"
                ? activeClass
                : "text-gray-700  dark:text-gray-200 hover:underline underline-offset-2 dark:hover:bg-gray-700 hover:text-primary"
            }`}
          >
            Dashboard
          </Link>
        </motion.span>
      )}
      <motion.span whileHover={hoverStyles}>
        <Link
          onClick={() => setIsOpen(false)}
          to={"/blog"}
          className={`px-3 text-lg lg:text-sm py-2 mx-3 mt-2 rounded-md lg:mt-0 duration-300 transform transition-colors font-medium ${
            location.pathname === "/blog"
              ? activeClass
              : "text-gray-700  dark:text-gray-200 hover:underline underline-offset-2 dark:hover:bg-gray-700 hover:text-primary"
          }`}
        >
          Blog
        </Link>
      </motion.span>
      {user?.uid ? (
        <PrimaryBtn className={"h-10 px-6"} onClick={logoutUser}>
          {loadingState.logoutLoading ? "Signing Out" : "Sign Out"}{" "}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg> */}
        </PrimaryBtn>
      ) : (
        <PrimaryBtn
          className={"h-10 px-6"}
          to={"/login"}
          onClick={() => setIsOpen(false)}
        >
          Log in
        </PrimaryBtn>
      )}
    </>
  );
  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: "-100%" }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            type: "tween",
            bounce: 0.5,
          },
        }}
        className="sticky top-0 h-16 sm:h-20 lg:px-28 lg:h-24 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-gray-800 dark:border-gray-700 lg:py-2.5"
      >
        <nav className="container px-6 py-4 mx-auto">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold text-gray-700 relative">
                <Link
                  to={""}
                  className="text-2xl font-bold text-gray-800 transition-colors duration-300 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-2"
                >
                  <img className="" src="../../../public/favicon.ico" alt="" />
                  <span>
                    Your<span className="text-primary">Shelf</span>
                  </span>
                </Link>
              </div>

              <div className="absolute -translate-x-1/2 left-1/2 -translate-y-2 hidden lg:flex items-center gap-5">
                <Search />
                {/* <input
                  type="checkbox"
                  name=""
                  id="checkbox"
                  class="hidden peer"
                />
                <label htmlFor="checkbox" class="cursor-pointer">
                  <SunIcon className="lg:w-7 lg:h-7 w-6 h-6 text-primary invisible peer-checked:visible" />
                  <MoonIcon className="lg:w-7 lg:h-7 w-6 h-6 text-primary" />
                </label> */}
              </div>
              {/* <!-- Mobile menu button --> */}
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  <Bars3Icon
                    onClick={() => setIsOpen(true)}
                    className={isOpen === false ? "w-6 h-6" : "hidden"}
                  />
                  <XMarkIcon
                    onClick={() => setIsOpen(false)}
                    className={isOpen === true ? "w-6 h-6" : "hidden"}
                  />
                </button>
              </div>
            </div>
            {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
            <div className="hidden dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
              <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                {navItems}
              </div>
            </div>

            {width < 1024 && isOpen && (
              <div className="absolute right-0 z-20 w-1/2 px-6 py-4 transition-all duration-300 ease-in-out bg-white flex flex-col gap-5">
                <Search />
                {navItems}
              </div>
            )}
          </div>
        </nav>
      </motion.header>
    </>
  );
}
