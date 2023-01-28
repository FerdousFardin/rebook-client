import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PrimaryBtn from "../../../components/Buttons/PrimaryBtn";
import { AuthContext } from "../../../context/AuthProvider";
import useWindowSize from "../../../hooks/useWindowSize";
import Search from "../../../components/Search/Search";
import { AnimatePresence, motion } from "framer-motion";
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
              location.pathname.includes("/dashboard")
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
            <div className="flex  items-center justify-between">
              <button
                type="button"
                className="lg:hidden text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
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
              <div className="text-xl font-semibold text-gray-700 relative">
                <Link
                  to={""}
                  className="text-xl md:text-2xl font-bold text-gray-800 transition-colors duration-300 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-2"
                >
                  <img className="" src="../../../public/favicon.ico" alt="" />
                  <span>
                    Your<span className="text-primary">Shelf</span>
                  </span>
                </Link>
              </div>

              <div className="absolute -translate-x-1/2 left-1/2 -translate-y-2 hidden lg:flex items-center gap-5">
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
                <div className="lg:hidden flex items-center">
                  <Search />
                  {user?.uid ? (
                    <PrimaryBtn className={"h-10 px-6"} onClick={logoutUser}>
                      {loadingState.logoutLoading ? "Signing Out" : "Sign Out"}
                    </PrimaryBtn>
                  ) : (
                    <>
                      <PrimaryBtn className={"h-10 px-6"} to={"/login"}>
                        Log In
                      </PrimaryBtn>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* Mobile Menu  */}
            <div className=" dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
              <div className="lg:flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8 hidden">
                {navItems}
              </div>
              <div className="hidden lg:flex gap-2 items-center ">
                <Search />
                {user?.uid ? (
                  <PrimaryBtn className={"h-10 px-6"} onClick={logoutUser}>
                    {loadingState.logoutLoading ? "Signing Out" : "Sign Out"}
                  </PrimaryBtn>
                ) : (
                  <>
                    <PrimaryBtn className={"h-10 px-6"} to={"/login"}>
                      Log In
                    </PrimaryBtn>
                    <PrimaryBtn
                      className={"h-10 px-6 bg-primary"}
                      to={"/signup"}
                    >
                      Sign Up
                    </PrimaryBtn>
                  </>
                )}
              </div>
            </div>

            {width < 1024 && isOpen && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: "-100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0.3, y: "-70%" }}
                  className="absolute left-0 top-full z-20 w-1/2 px-6 py-4 bg-gray-100/90 flex flex-col gap-5"
                >
                  {navItems}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </nav>
      </motion.header>
    </>
  );
}
