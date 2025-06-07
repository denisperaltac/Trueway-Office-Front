import { configureStore, Middleware } from "@reduxjs/toolkit";
import usersReducer from "./users/slice";
import userReducer from "./user/slice";
import categoriasReducer from "./categorias/slice";
import proveedoresReducer from "./proveedor/slice";
import areaReducer from "./area/slice";
import authReducer from "./auth/slice";

const persistanceLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    next(action);
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
  };

export const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    categorias: categoriasReducer,
    proveedores: proveedoresReducer,
    area: areaReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistanceLocalStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
