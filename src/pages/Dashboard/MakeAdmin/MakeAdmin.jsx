import { useQuery } from "@tanstack/react-query";
import React, { useReducer } from "react";
import usersReducer from "../../../../utility/usersReducer";
import Loader from "../../../components/Loader/Loader";
import NoItems from "../../../components/NoItems/NoItems";
import SmallBtn from "../../../components/SmallBtn/SmallBtn";

const MakeAdmin = () => {
  const {
    isLoading,
    data: allUsers,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/users`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("rebookToken")}`,
        },
      }).then((res) => res.json()),
  });
  const usersInitial = {};
  allUsers?.forEach((user) => {
    usersInitial[user._id] = false;
  });
  const [userState, dispatch] = useReducer(usersReducer, usersInitial);
  // console.log(usersInitial);
  if (isLoading) return <Loader />;
  if (error) return;

  const handleAdmin = (id) => {
    dispatch({ type: "MAKE_ADMIN", field: id, payload: true });
    console.log(userState, usersInitial);
    setTimeout(() => {
      // console.log(id);
      dispatch({ type: "MAKE_ADMIN", field: id, payload: false });
    }, 7000);
  };
  return (
    <>
      {/* {allUsers.length > 0 ? (
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-3 font-bold text-left uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"></th>
              <th className="p-3 font-bold text-left uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Customer name
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Email
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map(({ _id, name, email, photoURL, role }) => (
              <tr
                key={_id}
                className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
              >
                <td className="w-full lg:w-fit lg:max-w-xs p-3 text-gray-700 text-center lg:text-left border border-b block lg:table-cell relative lg:static font-semibold">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={photoURL}
                    alt={name}
                  />
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center  border border-b  block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Customer name
                  </span>
                  {name}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Email
                  </span>
                  {email}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b  block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Actions
                  </span>

                  <div className="flex w-full justify-center">
                    {role?.includes("admin") ? (
                      "-"
                    ) : (
                      <SmallBtn
                        loading={userState._id}
                        handler={() => handleAdmin(_id)}
                        variants={["Make admin", "Wait"]}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <NoItems page={"All Buyers"} message={"Try again later."} />
      )} */}
      <NoItems page={"All Buyers"} message={"Currently in Production!"} />
    </>
  );
};

export default MakeAdmin;
