import "./App.css";
import {
  BrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { routes } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
// import AnimatedRoute from "./components/AnimatedRoute/AnimatedRoute";
import { AnimatePresence } from "framer-motion";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence>
          <RouterProvider router={routes}></RouterProvider>
        </AnimatePresence>
        {/* <BrowserRouter>
          <AnimatedRoute />
          <ScrollRestoration />
        </BrowserRouter> */}
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
