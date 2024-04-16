import type { Instrument } from "@prisma/client";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from "~/lib/store";
// import type { GetAllInstruments } from "~/server/types/instrumentTypes";

/** @todo Incorporate GetAllInstruments type */

export type InstrumentState = {
  instruments: Instrument[];
};

const initialState = {
  instruments: [{}],
};

export const instrumentSlice = createSlice({
  name: "instruments",
  initialState,
  reducers: {
    setInstruments: (state, action: PayloadAction<Instrument[]>) => {
      state.instruments = action.payload;
    },
  },
});

export const { setInstruments } = instrumentSlice.actions;

export const useInstruments = () =>
  useSelector((state: RootState) => state.instruments.instruments);
