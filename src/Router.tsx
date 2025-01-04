import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./pages/dashboard/Dashboard";
import "./styles/main.css";
import { useAppSelector } from "./hooks/store";
import { AuthController } from "./pages/auth/AuthController";
import { useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "./config/config";
import { useCategoriaActions } from "./hooks/useCategoriaActions";
export const Router = () => {
  const user = useAppSelector((state) => state.user);
  const { addCategorias } = useCategoriaActions();

  useEffect(() => {
    if (user.userId > 0) {
      axios.get(BaseUrl + "getCategorias").then((res) => {
        addCategorias(res.data.result);
      });
    }
  }, [user]);

  const AdminRoutes = [
    {
      path: "/",
      element: <Dashboard />,
    },
  ];

  const AuthRoutes = [
    {
      path: "/",
      element: <AuthController />,
    },
  ];
  const Routes = createBrowserRouter(
    user.userId && user.userId > 0 ? AdminRoutes : AuthRoutes
  );

  return <RouterProvider router={Routes} />;
};
