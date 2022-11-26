import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import PrimaryBtn from "../../../components/Buttons/PrimaryBtn";
import { AuthContext } from "../../../context/AuthProvider";

export default function Navbar() {
  const { user, logoutUser, setLoading, loading } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function onWindowResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);
  const activeClass = "text-primary";
  const handleSignout = () => {
    logoutUser()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {});
  };
  const navItems = (
    <>
      <NavLink
        to={"/"}
        className={`px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary`}
      >
        {({ isActive }) => (
          <span className={`${isActive ? activeClass : ""}`}>Home</span>
        )}
      </NavLink>
      {user?.uid && (
        <NavLink
          to={"/dashboard/my-orders"}
          className={`px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary`}
        >
          {({ isActive }) => (
            <span className={`${isActive ? activeClass : ""}`}>Dashboard</span>
          )}
        </NavLink>
      )}
      <NavLink
        to={"/some"}
        className={`px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary`}
      >
        {({ isActive }) => (
          <span className={`${isActive ? activeClass : ""}`}>Blog</span>
        )}
      </NavLink>
      <NavLink
        to={"/some"}
        className={`px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary`}
      >
        {({ isActive }) => (
          <span className={`${isActive ? activeClass : ""}`}>Experts</span>
        )}
      </NavLink>
      {user?.uid ? (
        <PrimaryBtn className={"h-10 px-4"} onClick={handleSignout}>
          {loading ? "Signing Out..." : "Sign Out"}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </PrimaryBtn>
      ) : (
        <PrimaryBtn className={"h-10 px-4"} to={"/login"}>
          Log in
        </PrimaryBtn>
      )}
    </>
  );
  return (
    <>
      <nav
        // x-data="{ isOpen: false }"
        className="sticky top-0 min-h-16 z-50 border-b bg-white dark:bg-gray-800 dark:border-gray-700 lg:py-2.5"
      >
        <div className="container px-6 py-4 mx-auto">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold text-gray-700">
                <NavLink
                  id="header"
                  to={""}
                  className="text-2xl font-bold text-gray-800 transition-colors duration-300 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-2"
                >
                  <img className="" src="../../../public/favicon.ico" alt="" />
                  <span>
                    re<span className="text-primary">BOOK</span>
                  </span>
                </NavLink>
              </div>

              {/* <!-- Mobile menu button --> */}
              <div className="flex lg:hidden">
                <button
                  // x-cloak @click="isOpen = !isOpen"
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  <svg
                    onClick={() => setIsOpen(true)}
                    xmlns="http://www.w3.org/2000/svg"
                    className={isOpen === false ? "w-6 h-6" : "hidden"}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>

                  <svg
                    onClick={() => setIsOpen(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    className={isOpen === true ? "w-6 h-6" : "hidden"}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
            <div
              // x-cloak :className="[isOpen ? 'translate-x-0 opacity-100 ' :
              // 'opacity-0 -translate-x-full']"
              className="hidden dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center"
            >
              <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                {navItems}
              </div>

              <div className="flex items-center mt-4 lg:mt-0">
                {/* <button
                  className="hidden mx-4 text-gray-600 transition-colors duration-300 transform lg:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                  aria-label="show notifications"
                >
                  <svg
                    className={isOpen?"w-6 h-6":"hidden"}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button> */}

                {/* <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                        <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" className="object-cover w-full h-full" alt="avatar"/>
                        </div>

                        <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">Khatab wedaa</h3>
                    </button> */}
              </div>
            </div>

            {windowWidth < 1024 && isOpen && (
              <div className="absolute right-0 z-20 w-1/2 px-6 py-4 transition-all duration-300 ease-in-out bg-white flex flex-col">
                {navItems}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
