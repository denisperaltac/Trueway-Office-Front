import { createSlice } from "@reduxjs/toolkit";

export interface Usuario {
  name: string;
  email: string;
}

export interface UsuarioConId extends Usuario {
  id: number;
}

const initialState: UsuarioConId[] = (() => {
  const persistedState = localStorage.getItem("__redux__state__");
  if (persistedState) {
    try {
      const parsedState = JSON.parse(persistedState);
      if (parsedState.users) {
        return parsedState.users;
      }
    } catch (e) {
      console.error("Failed to parse state from localStorage", e);
    }
  }
  return [{ id: 1, name: "Denis", email: "Peluca" }];
})();

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUsuario: (state, action) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
  },
});

export default usersSlice.reducer;

export const { deleteUsuario } = usersSlice.actions;
