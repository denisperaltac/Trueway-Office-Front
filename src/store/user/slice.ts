import { createSlice } from "@reduxjs/toolkit";

export interface User {
  userId: number;
  name: string;
  userName: string;
}

const initialState: User = (() => {
  const persistedState = localStorage.getItem("__redux__state__");
  if (persistedState) {
    try {
      const parsedState = JSON.parse(persistedState);
      if (parsedState.user) {
        return parsedState.user;
      }
    } catch (e) {
      console.error("Failed to parse state from localStorage", e);
    }
  }
  return { userId: 0, name: "null", userName: "null" };
})();

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (_, action) => {
      const User = action.payload;
      return (User);
    },
    logOut: (_) => {
      return ({ userId: 0, name: "null", userName: "null" });
    },
  },
});

export default userSlice.reducer;

export const { logIn, logOut } = userSlice.actions;
