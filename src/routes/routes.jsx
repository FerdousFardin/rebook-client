import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import CategoryProduct from "../pages/CategoryProducts/CategoryProduct";
import Home from "../pages/Home/Home";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/category/:id",
        element: <CategoryProduct />,
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_API_URL}/products?categoryId=${params.id}`
          ),
      },
    ],
  },
]);
