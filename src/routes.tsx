/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import RegisterConfirmation from "./pages/register-confirmation/register-confirmation";
import Register from "./pages/register/register";
import CheckouSucess from "./pages/checkout-sucess/checkout-sucess";
import CheckouError from "./pages/checkout-error/checkout-error";
import Plan from "./pages/plan/plan";

export const routes: any = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/confirmation",
    element: <RegisterConfirmation />,
  },
  {
    path: "/checkout-success",
    element: <CheckouSucess />,
  },
  {
    path: "/checkout-error",
    element: <CheckouError />,
  },
  {
    path: "/my-plan",
    element: <Plan />,
  },
]);
