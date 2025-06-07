import { useState } from "react";
import { Auth } from "./Auth";
import { useUserActions } from "../../hooks/useUserActions";
import { useAppDispatch } from "../../hooks/store";
import { setToken } from "../../store/auth/slice";
import axiosInstance from "../../config/axios";

export const AuthController: React.FC = () => {
  const { logInUser } = useUserActions();
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = () => {
    if (!form.email || !form.password) {
      setMessage("Por favor complete todos los campos");
      return;
    }

    setIsLoading(true);
    setMessage("");

    axiosInstance
      .post(`auth/login`, form)
      .then((response) => {
        if (response.data.success) {
          // Store token in Redux
          dispatch(setToken(response.data.result.token));

          const user = response.data.result.usuario;
          // Store user info in Redux
          logInUser({
            userId: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol,
          });
        } else {
          setMessage(response.data.error || "Error al iniciar sesión");
        }
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.error || "Error al iniciar sesión";
        setMessage(errorMessage);
        console.error("Error en login:", err);
      });
  };

  return (
    <Auth
      onSubmit={onSubmit}
      message={message}
      setIsLoading={setIsLoading}
      isLoading={isLoading}
      setForm={setForm}
      form={form}
    />
  );
};

export const AuthRoute = {
  path: "/",
  element: <AuthController />,
};
