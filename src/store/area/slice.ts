import { createSlice } from "@reduxjs/toolkit";

export interface Area {
  areaId: number;
  name: string;
  description: string | null;
  deleted: boolean;
}

const initialState: Area[] = [];

export const areaSlice = createSlice({
  name: "area",
  initialState,
  reducers: {
    addAreas: (_, action) => {
      return action.payload;
    },
    addArea: (state, action) => {
      state.push(action.payload);
    },
    updateArea: (state, action) => {
      const index = state.findIndex(
        (area) => area.areaId === action.payload.areaId
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteArea: (state, action) => {
      const index = state.findIndex((area) => area.areaId === action.payload);
      if (index !== -1) {
        state[index].deleted = true;
      }
    },
  },
});

export const { addAreas, addArea, updateArea, deleteArea } = areaSlice.actions;
export default areaSlice.reducer;
