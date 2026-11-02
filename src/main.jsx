import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { MainLayout } from "./layouts/MainLayout";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./Tank Stack/queryClient";

const router = createBrowserRouter([
  {
    Component: AuthLayout,
    children: [
      { path: "login", lazy: () => import('./Auth/Login') },
      { path: "register", lazy: () => import('./Auth/Register') }
    ],
  },
  {
    Component: MainLayout,
    children: [
      { index: true, lazy: () => import("./App") },
      { path: "about", lazy: () => import("./Pages/About") },
      { path: "users/:id", lazy: () => import("./Pages/userDetails") },
      { path: "zustand", lazy: () => import("./Pages/PageTestZustand") },
      { path: "debouncePage", lazy: () => import("./Pages/Searching/DebouncePageInSearching") },
      { path: "normalSearch", lazy: () => import("./Pages/Searching/NormalSearch") },

    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);
