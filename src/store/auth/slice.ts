import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = (() => {
  const persistedState = localStorage.getItem("__redux__state__");
  if (persistedState) {
    try {
      const parsedState = JSON.parse(persistedState);
      if (parsedState.auth?.token) {
        return { token: parsedState.auth.token };
      }
    } catch (e) {
      console.error("Failed to parse state from localStorage", e);
    }
  }
  return { token: null };
})();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
