import { createSlice } from "@reduxjs/toolkit";

export interface Proveedores {
  proveedorId: number;
  name: string;
}

const initialState: Proveedores = (() => {
  const persistedState = localStorage.getItem("__redux__state__");
  if (persistedState) {
    try {
      const parsedState = JSON.parse(persistedState);
      if (parsedState.proveedores) {
        return parsedState.proveedores;
      }
    } catch (e) {
      console.error("Failed to parse state from localStorage", e);
    }
  }
  return [];
})();

export const proveedoresSlice = createSlice({
  name: "proveedores",
  initialState,
  reducers: {
    addProveedorSlice: (state, action) => {
      const Proveedores = action.payload;
      return (state = Proveedores);
    },
  },
});

export default proveedoresSlice.reducer;

export const { addProveedorSlice } = proveedoresSlice.actions;
