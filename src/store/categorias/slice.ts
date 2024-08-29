import { createSlice } from "@reduxjs/toolkit";

export interface Categorias {
  categoriaId: number;
  name: string;
}

const initialState: Categorias = (() => {
  const persistedState = localStorage.getItem("__redux__state__");
  if (persistedState) {
    try {
      const parsedState = JSON.parse(persistedState);
      if (parsedState.categorias) {
        return parsedState.categorias;
      }
    } catch (e) {
      console.error("Failed to parse state from localStorage", e);
    }
  }
  return [];
})();

export const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {
    addCategoriasSlice: (state, action) => {
      const Categorias = action.payload;
      return (state = Categorias);
    },
  },
});

export default categoriasSlice.reducer;

export const { addCategoriasSlice } = categoriasSlice.actions;
