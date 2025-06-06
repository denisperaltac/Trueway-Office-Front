import { useState } from "react";
import { BaseUrl } from "../../config/config";
import axios from "axios";
import { Auth } from "./Auth";
import { useUserActions } from "../../hooks/useUserActions";

export const AuthController: React.FC = () => {
  const { logInUser } = useUserActions();
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

    axios
      .post(`${BaseUrl}auth/login`, form)
      .then((response) => {
        if (response.data.success) {
          // Guardar el token en localStorage
          localStorage.setItem("token", response.data.result.token);

          // Configurar el token por defecto para todas las peticiones
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.result.token}`;
          const user = response.data.result.usuario;
          // Guardar la información del usuario
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
      })
      .finally(() => setIsLoading(false));
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
