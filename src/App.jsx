import "./App.css";
import { RouterProvider, ScrollRestoration } from "react-router-dom";
import { routes } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
// import { routes } from "./routes/routes";0

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
