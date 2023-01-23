import { createBrowserRouter } from "react-router-dom";
import Blog from "../pages/Blog/Blog";
import CategoryProduct from "../pages/CategoryProducts/CategoryProduct";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../pages/Dashboard/AllSellers/AllSellers";
import Checkout from "../pages/Dashboard/Checkout/Checkout";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import ReportedItems from "../pages/Dashboard/ReportedItems/ReportedItems";
import Myorders from "../pages/Dashboard/MyOrders/Myorders";
import MyProducts from "../pages/Dashboard/MyProducts/MyProducts";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AdminRoute from "./Admin/AdminRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import SellerRoute from "./Seller/SellerRoute";
import MyBuyers from "../pages/Dashboard/MyBuyers/MyBuyers";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import { PageWrapper } from "../components/PageWrapper/PageWrapper";
import Layout from "../layout/Layout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <PageWrapper>
            <Home />
          </PageWrapper>
        ),
      },
      {
        path: "/category/:id",
        element: <CategoryProduct />,
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
        path: "/blog",
        element: (
          <PageWrapper>
            <Blog />
          </PageWrapper>
        ),
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
            path: "/dashboard",
            element: <MyProfile />,
          },
          {
            path: "/dashboard/my-profile",
            element: <MyProfile />,
          },
          {
            path: "/dashboard/my-orders",
            element: <Myorders />,
          },
          {
            path: "/dashboard/add-a-product",
            element: (
              <SellerRoute>
                <AddProduct />
              </SellerRoute>
            ),
          },
          {
            path: "/dashboard/my-products",
            element: (
              <SellerRoute>
                <MyProducts />
              </SellerRoute>
            ),
          },
          {
            path: "/dashboard/my-buyers",
            element: (
              <SellerRoute>
                <MyBuyers />
              </SellerRoute>
            ),
          },
          {
            path: "/dashboard/all-sellers",
            element: (
              <AdminRoute>
                <AllSellers />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/all-buyers",
            element: (
              <AdminRoute>
                <AllBuyers />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/make-admin",
            element: (
              <AdminRoute>
                <MakeAdmin />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/reported-items",
            element: (
              <AdminRoute>
                <ReportedItems />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/checkout/:id",
            element: <Checkout />,
            loader: ({ params }) =>
              fetch(
                `${import.meta.env.VITE_API_URL}/bookings?id=${params.id}`,
                {
                  headers: {
                    authorization: `bearer ${localStorage.getItem(
                      "rebookToken"
                    )}`,
                  },
                }
              ),
          },
        ],
      },
    ],
  },
  {
    path: "/error",
    element: <Error />,
  },
]);
