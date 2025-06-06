import LogoOffice from "../../assets/LogoOffice.png";
import { Button, Spin } from "antd";
import React, { useEffect } from "react";

interface FormData {
  email: string;
  password: string;
}

interface AuthProps {
  onSubmit: () => void;
  message: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  form: FormData;
}

export const Auth: React.FC<AuthProps> = ({
  onSubmit,
  isLoading,
  message,
  setForm,
  form,
}) => {
  const signInEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  useEffect(() => {
    window.history.pushState("", "", "/");
  }, []);

  const formSection = (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-2xl rounded-2xl px-10 pt-8 pb-10 mb-4 w-full max-w-md"
    >
      <div className="flex justify-center mb-8">
        <img src={LogoOffice} className="w-48" alt="Logo Trueway Office" />
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="username"
        >
          Usuario
        </label>
        <input
          onKeyDown={signInEnter}
          className={`shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
          ${message ? "border-red-500 focus:ring-red-500" : "border-gray-300"}`}
          id="username"
          type="text"
          placeholder="Ingrese su usuario"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="mb-8">
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="password"
        >
          Contraseña
        </label>
        <input
          className={`shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
          ${message ? "border-red-500 focus:ring-red-500" : "border-gray-300"}`}
          id="password"
          type="password"
          onKeyDown={signInEnter}
          placeholder="Ingrese su contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {message && <p className="text-red-500 text-xs mt-2">{message}</p>}
      </div>
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onSubmit}
          type="primary"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>

        <a
          className="inline-block align-baseline font-medium text-sm text-blue-600 hover:text-blue-800 transition-colors"
          href="#"
        >
          ¿Olvidó su contraseña?
        </a>
      </div>
    </form>
  );

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        {isLoading ? <Spin tip="Cargando...">{formSection}</Spin> : formSection}
      </div>
    </section>
  );
};
