import LogoOffice from "../../assets/LogoOffice.png";
import { Button, Spin } from "antd";
import React, { useEffect } from "react";

interface AuthProps {
  onSubmit: () => void;
  message: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setForm: React.Dispatch<React.SetStateAction<{}>>;
  form: {};
}

export const Auth: React.FC<AuthProps> = ({
  onSubmit,
  isLoading,
  message,
  setForm,
  form,
}) => {
  const signInEnter = (event: any) => {
    if (event.keyCode === 13) {
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
        <img src={LogoOffice} className="w-48" alt="Logo Caffito" />
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          onKeyDown={signInEnter}
          className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          id="username"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setForm({ ...form, userName: e.target.value })}
        />
      </div>
      <div className="mb-8">
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className={`shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
          ${message ? "border-red-500 focus:ring-red-500" : "border-gray-300"}`}
          id="password"
          type="password"
          onKeyDown={signInEnter}
          placeholder="Enter your password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {message && <p className="text-red-500 text-xs mt-2">{message}</p>}
      </div>
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onSubmit}
          type="primary"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
        >
          Sign In
        </Button>

        <a
          className="inline-block align-baseline font-medium text-sm text-blue-600 hover:text-blue-800 transition-colors"
          href="#"
        >
          Forgot Password?
        </a>
      </div>
    </form>
  );

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        {isLoading ? <Spin tip="Loading...">{formSection}</Spin> : formSection}
      </div>
    </section>
  );
};
