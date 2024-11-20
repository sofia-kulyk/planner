import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateState {
  month: number;
  year: number;
}
const initialState: DateState = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};
const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<string>) {
      if (action.payload === "next" && state.month === 11) {
        state.year = state.year + 1;
        state.month = 0;
      } else if (state.month === 0 && action.payload !== "next") {
        state.year = state.year - 1;
        state.month = 11;
      } else if (action.payload === "next") {
        state.month++;
      } else {
        state.month--;
      }
    },
  },
});

export default dateSlice;
export const dateSliceAction = dateSlice.actions;
