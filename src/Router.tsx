import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdminRoute } from "./pages/dashboard/Dashboard";
import { useAppSelector } from "./hooks/store";
import { AuthRoute } from "./pages/auth/AuthController";
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "./config/config";
import { useCategoriaActions } from "./hooks/useCategoriaActions";
import { useProveedorActions } from "./hooks/useProveedorActions";
import { Loading } from "./pages/loading/Loading";
import { useAreaActions } from "./hooks/useAreaActions";
export const Router = () => {
  const user = useAppSelector((state) => state.user);
  const AdminRoutes = [AdminRoute];
  const AuthRoutes = [AuthRoute];

  const [Routes, setRoutes] = useState<any>();
  const { addCategorias } = useCategoriaActions();
  const { addProveedor } = useProveedorActions();
  const { addAreas } = useAreaActions();

  useEffect(() => {
    if (user.userId > 0) {
      Promise.all([
        axios.get(BaseUrl + "categories/get"),
        axios.get(BaseUrl + "suppliers/get"),
        axios.get(BaseUrl + "areas/get"),
      ])
        .then(([categoriasResponse, proveedoresResponse, areasResponse]) => {
          addCategorias(categoriasResponse.data.result);
          addProveedor(proveedoresResponse.data.result);
          addAreas(areasResponse.data);
          setRoutes(createBrowserRouter(AdminRoutes));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setRoutes(createBrowserRouter(AuthRoutes));
    }
  }, [user]);

  return Routes ? <RouterProvider router={Routes} /> : <Loading />;
};
