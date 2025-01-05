import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdminRoute } from "./pages/dashboard/Dashboard";
import "./styles/main.css";
import { useAppSelector } from "./hooks/store";
import { AuthRoute } from "./pages/auth/AuthController";
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "./config/config";
import { useCategoriaActions } from "./hooks/useCategoriaActions";
import { useProveedorActions } from "./hooks/useProveedorActions";
export const Router = () => {
  const user = useAppSelector((state) => state.user);
  const AdminRoutes = [AdminRoute];
  const AuthRoutes = [AuthRoute];

  const [Routes, setRoutes] = useState(createBrowserRouter(AuthRoutes));
  const { addCategorias } = useCategoriaActions();
  const { addProveedor } = useProveedorActions();

  useEffect(() => {
    if (user.userId > 0) {
      Promise.all([
        axios.get(BaseUrl + "getCategorias"),
        axios.get(BaseUrl + "getProveedores"),
      ])
        .then(([categoriasResponse, proveedoresResponse]) => {
          addCategorias(categoriasResponse.data.result);
          addProveedor(proveedoresResponse.data.result);
          setRoutes(createBrowserRouter(AdminRoutes));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [user]);

  return <RouterProvider router={Routes} />;
};
