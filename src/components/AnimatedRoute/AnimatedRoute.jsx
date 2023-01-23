import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "../../layout/Main";
import Blog from "../../pages/Blog/Blog";
import CategoryProduct from "../../pages/CategoryProducts/CategoryProduct";
import AddProduct from "../../pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../pages/Dashboard/AllSellers/AllSellers";
import Checkout from "../../pages/Dashboard/Checkout/Checkout";
import Dashboard from "../../pages/Dashboard/Dashboard/Dashboard";
import MakeAdmin from "../../pages/Dashboard/MakeAdmin/MakeAdmin";
import MyBuyers from "../../pages/Dashboard/MyBuyers/MyBuyers";
import Myorders from "../../pages/Dashboard/MyOrders/Myorders";
import MyProducts from "../../pages/Dashboard/MyProducts/MyProducts";
import MyProfile from "../../pages/Dashboard/MyProfile/MyProfile";
import ReportedItems from "../../pages/Dashboard/ReportedItems/ReportedItems";
import Error from "../../pages/Error/Error";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import AdminRoute from "../../routes/Admin/AdminRoute";
import PrivateRoute from "../../routes/PrivateRoute/PrivateRoute";
import SellerRoute from "../../routes/Seller/SellerRoute";

/**
 *
 * currently not using this but can be done the same thing as you can with routes, but it won't restore the scroll position.
 */

function AnimatedRoute() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/category/:id"
            element={
              <PrivateRoute>
                <CategoryProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard/my-profile" element={<MyProfile />} />
            <Route path="/dashboard/my-orders" element={<Myorders />} />
            <Route
              path="/dashboard/all-buyers"
              element={
                <AdminRoute>
                  <AllBuyers />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/add-a-product"
              element={
                <SellerRoute>
                  <AddProduct />
                </SellerRoute>
              }
            />
            <Route
              path="/dashboard/all-sellers"
              element={
                <AdminRoute>
                  <AllSellers />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/my-buyers"
              element={
                <SellerRoute>
                  <MyBuyers />
                </SellerRoute>
              }
            />
            <Route
              path="/dashboard/my-products"
              element={
                <SellerRoute>
                  <MyProducts />
                </SellerRoute>
              }
            />
            <Route
              path="/dashboard/add-a-product"
              element={
                <SellerRoute>
                  <AddProduct />
                </SellerRoute>
              }
            />
            <Route
              path="/dashboard/make-admin"
              element={
                <AdminRoute>
                  <MakeAdmin />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/reported-items"
              element={
                <AdminRoute>
                  <ReportedItems />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/checkout/:id"
              element={<Checkout />}
              loader={({ params }) =>
                fetch(
                  `${import.meta.env.VITE_API_URL}/bookings?id=${params.id}`,
                  {
                    headers: {
                      authorization: `bearer ${localStorage.getItem(
                        "rebookToken"
                      )}`,
                    },
                  }
                )
              }
            />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoute;
