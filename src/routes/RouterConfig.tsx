import { createBrowserRouter } from "react-router-dom";
import { Routes } from "./CONSTANTS";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import MyRafflesPage from "../pages/Raffles/MyRafflesPage";
import RaffleDetailPage from "../pages/Raffles/RaffleDetailPage";
import RaffleFormPage from "../pages/Raffles/RaffleFormPage";
import RaffleDrawPage from "../pages/Raffles/RaffleDrawPage";
import JoinedRafflesPage from "../pages/Raffles/JoinedRafflesPage";

export const routerConfig = createBrowserRouter([
  {
    path: Routes.AUTH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: Routes.AUTH.REGISTER,
    element: <SignUpPage />,
  },
  {
    path: Routes.HOME,
    element: <HomePage />,
  },
  {
    path: Routes.RAFFLES.MY_RAFFLES,
    element: <MyRafflesPage />,
  },
  {
    path: Routes.RAFFLES.CREATE,
    element: <RaffleFormPage />,
  },
  {
    path: Routes.RAFFLES.EDIT,
    element: <RaffleFormPage />,
  },
  {
    path: Routes.RAFFLES.DETAIL,
    element: <RaffleDetailPage />,
  },
  {
    path: Routes.RAFFLES.RAFFLE_DRAW,
    element: <RaffleDrawPage />,
  },
  {
    path: Routes.RAFFLES.PARTICIPATING,
    element: <JoinedRafflesPage />,
  }

]);