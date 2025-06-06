import { useState } from "react";
import { BaseUrl } from "../../config/config";
import axios from "axios";
import { Auth } from "./Auth";
import { useUserActions } from "../../hooks/useUserActions";
export const AuthController: React.FC = () => {
  const { logInUser } = useUserActions();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({});

  const onSubmit = () => {
    setIsLoading(true);
    axios
      .post(`${BaseUrl}auth/login`, form)
      .then((response) => {
        logInUser(response.data);
      })
      .catch((err) => {
        setMessage("Usuario o contraseña incorrectos");
        console.log("Error log in" + err);
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
