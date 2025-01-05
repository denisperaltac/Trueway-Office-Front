import { useState } from "react";
import { BaseUrl } from "../../config/config";
import axios from "axios";
import { Auth } from "./Auth";
import { useUserActions } from "../../hooks/useUserActions";
export const AuthController: React.FC = () => {
  const { logInUser } = useUserActions();
  const [message, setMessage] = useState("");
  const [_, setIsLoading] = useState(false);
  const [form, setForm] = useState({});

  const onSubmit = () => {
    setIsLoading(true);
    axios
      .post(`${BaseUrl}login`, form)
      .then((response) => {
        logInUser(response.data);
        setMessage("hola");
      })
      .catch((err) => console.log("Error log in" + err))
      .finally(() => setIsLoading(false));
  };

  return (
    <Auth
      onSubmit={onSubmit}
      message={message}
      setIsLoading={setIsLoading}
      setForm={setForm}
      form={form}
    />
  );
};

export const AuthRoute = {
  path: "/",
  element: <AuthController />,
};
