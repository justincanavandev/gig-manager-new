import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from "~/lib/store";
import type { GigForm } from "~/server/types/gigTypes";

export interface GigFormState {
  gigForm: GigForm;
}

const initialState: GigFormState = {
  gigForm: {
    name: "",
    venueId: "",
    startTime: new Date(),
    endTime: new Date(),
    instrumentation: [],
    musicianIds: [],
  },
};

export const gigSlice = createSlice({
  name: "gigForm",
  initialState,
  reducers: {
    setGigForm: (state, action: PayloadAction<GigForm>) => {
      state.gigForm = action.payload;
    },
  },
});

export const { setGigForm } = gigSlice.actions;


export const useGigForm = () =>
  useSelector((state: RootState) => state.gigForm);
