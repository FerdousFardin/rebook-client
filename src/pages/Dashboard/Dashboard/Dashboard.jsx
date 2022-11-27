import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Drawer from "./Drawer/Drawer";

export default function Dashboard() {
  const location = useLocation();
  const dashboardMenu =
    location.pathname?.split("/")[2]?.split("-")?.join(" ") || undefined;
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
  const {
    isLoading,
    data: userInfo,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("rebookToken")}`,
        },
      }).then((res) => res.json()),
  });
  const activeClass =
    "relative flex items-center space-x-4 rounded-xl bg-gradient-to-br from-primary to-primary-100/50 px-4 py-3 text-white";
  if (isLoading) return <div>Loading</div>;
  if (error) return;
  const dashboardList = (
    <ul className="mt-8 space-y-2 tracking-wide">
      {userInfo.role.includes("buyer") && (
        <li>
          <NavLink
            onClick={() => setIsOpen(false)}
            to={"/dashboard/my-orders"}
            aria-label="dashboard"
            className={({ isActive }) =>
              isActive
                ? activeClass
                : "group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-black"
            }
          >
            <span className="-mr-1 font-medium">My Orders</span>
          </NavLink>
        </li>
      )}
      {userInfo.role.includes("admin") && (
        <>
          <li>
            <NavLink
              onClick={() => setIsOpen(false)}
              to={"/dashboard/all-sellers"}
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : "group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-black"
              }
            >
              <span className="group-hover:text-gray-700 dark:group-hover:text-gray-50">
                All Sellers
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setIsOpen(false)}
              to={"/dashboard/all-buyers"}
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : "group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-black"
              }
            >
              <span className="group-hover:text-gray-700 dark:group-hover:text-gray-50">
                All Buyers
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setIsOpen(false)}
              to={"/dashboard/reported-items"}
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : "group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-black"
              }
            >
              <span className="group-hover:text-gray-700 dark:group-hover:text-gray-50">
                Reported Items
              </span>
            </NavLink>
          </li>
        </>
      )}
      {userInfo.role.includes("seller") && (
        <>
          <li>
            <NavLink
              onClick={() => setIsOpen(false)}
              to={"/dashboard/add-a-product"}
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : "group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-black"
              }
            >
              <span className="group-hover:text-gray-700 dark:group-hover:text-gray-50">
                Add a product
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setIsOpen(false)}
              to={"/dashboard/my-buyers"}
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : "group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-black "
              }
            >
              <span className="group-hover:text-gray-700 dark:group-hover:text-white">
                My Buyers
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setIsOpen(false)}
              to={"/dashboard/my-products"}
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : "group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-black "
              }
            >
              <span className="group-hover:text-gray-700 dark:group-hover:text-white">
                My Products
              </span>
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );

  return (
    userInfo && (
      <section className="bg-gray-100 dark:bg-gray-900 relative">
        <aside className="absolute top-0 ml-[-100%] flex h-screen w-full flex-col justify-between border-r bg-white px-6 pb-3 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] dark:bg-gray-800 dark:border-gray-700">
          <div>
            <div className="mt-8 text-center">
              <img
                src={userInfo.photoURL}
                alt=""
                className="m-auto h-10 w-10 rounded-full object-cover lg:h-28 lg:w-28"
              />
              <h5 className="mt-4 hidden text-xl font-semibold text-gray-600 lg:block dark:text-gray-300">
                {userInfo.name}
              </h5>
              <span className="hidden text-gray-400 lg:block uppercase">
                {userInfo && userInfo?.role?.length > 1
                  ? userInfo.role.join(" and ")
                  : userInfo.role[0]}
              </span>
            </div>

            {dashboardList}
          </div>
        </aside>
        <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <div className="h-16 border-b bg-white dark:bg-gray-800 dark:border-gray-700 lg:py-2.5">
            <div className="flex items-center justify-between space-x-4 px-6 2xl:container">
              <h5
                hidden
                className="text-2xl font-light text-gray-600 lg:block dark:text-white uppercase"
              >
                Dashboard{" "}
                {dashboardMenu && (
                  <ChevronRightIcon className="w-5 h-5 inline-block" />
                )}{" "}
                {dashboardMenu}
              </h5>
              <button
                onClick={() => setIsOpen(true)}
                className="-mr-2 h-16 w-12 border-r lg:hidden dark:border-gray-700 dark:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              {windowWidth < 1024 && (
                <Drawer {...{ isOpen, setIsOpen }}>{dashboardList}</Drawer>
              )}
              <div className="flex space-x-4">
                <h5 className="text-xl text-center font-medium text-gray-600 lg:hidden dark:text-white uppercase">
                  Dashboard{" "}
                  {dashboardMenu && (
                    <ChevronRightIcon className="w-5 h-5 inline-block" />
                  )}{" "}
                  {dashboardMenu}
                </h5>
              </div>
            </div>
          </div>

          <div className="2xl:container">
            <div className="min-h-[80vh]">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    )
  );
}
