import LogoCaffito from "../../assets/LogoCaffito.png";
import { Button } from "antd";
import React, { useEffect } from "react";

interface AuthProps {
  onSubmit: () => void;
  message: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setForm: React.Dispatch<React.SetStateAction<{}>>;
  form: {};
}

export const Auth: React.FC<AuthProps> = ({
  onSubmit,
  message,
  setForm,
  form,
}) => {
  const signInEnter = (event: any) => {
    if (event.keyCode === 13) {
      onSubmit();
    }
  };
  useEffect(() => {
    window.history.pushState("", "", "/");
  }, []);

  return (
    <section className="bg-slate-500 w-screen h-screen flex flex-col items-center justify-center backgroundLogIn">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-2 pb-8 mb-4">
          <img src={LogoCaffito} className="w-auto " alt="Logo Caffito" />

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              onKeyDown={signInEnter}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline
              ${message === "Error password" && "border-red-500"}
              `}
              id="password"
              type="password"
              onKeyDown={signInEnter}
              placeholder="************"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {message === "Error password" && (
              <p className="text-red-500 text-xs italic">Incorrect password.</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Button onClick={onSubmit} type="primary">
              Ingresar
            </Button>

            <a
              className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800 transition"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};
