import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./Pages/Home/Home.jsx";
import Root from "./Pages/Root/Root.jsx";
import ErrorPages from "./Pages/ErrorPages/ErrorPages.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import ForgotPass from "./Pages/ForgotPass/ForgotPass.jsx";
import AuthLayout from "./Pages/AuthLayout/AuthLayout.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import PrivateRoute from "./provider/PrivateRoute.jsx";
import Private from "./Pages/Private/Private.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPages></ErrorPages>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/private",
        element: (
          <PrivateRoute>
            <Private></Private>
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        Component: ErrorPages,
      },
      
      {
        path: "/auth",
        Component: AuthLayout,
        children: [
          {
            path: "login",
            Component: Login,
          },
          {
            path: "register",
            Component: Register,
          },
          {
            path: "forgotPassword",
            Component: ForgotPass,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
  </StrictMode>
);
