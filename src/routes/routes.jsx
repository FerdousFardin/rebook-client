import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import CategoryProduct from "../pages/CategoryProducts/CategoryProduct";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import Myorders from "../pages/Dashboard/MyOrders/Myorders";
import MyProducts from "../pages/Dashboard/MyProducts/MyProducts";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/category/:id",
        element: (
          <PrivateRoute>
            <CategoryProduct />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_API_URL}/products?categoryId=${params.id}`,
            {
              headers: {
                authorization: `bearer ${localStorage.getItem("rebookToken")}`,
              },
            }
          ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard/my-orders",
            element: <Myorders />,
          },
          {
            path: "/dashboard/add-a-product",
            element: <AddProduct />,
          },
          {
            path: "/dashboard/my-products",
            element: <MyProducts />,
          },
        ],
      },
    ],
  },
]);
