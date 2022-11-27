import "./App.css";
import { RouterProvider, ScrollRestoration } from "react-router-dom";
import { routes } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
