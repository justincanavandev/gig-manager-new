import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from "~/lib/store";
import type { GetAllInstruments } from "~/server/types/instrumentTypes";
import type { GigFormInstrument } from "~/server/types/gigTypes";

export type InstrumentState = {
  instruments: GetAllInstruments;
};

const initialState: InstrumentState = {
  instruments: [],
};

export const instrumentSlice = createSlice({
  name: "instruments",
  initialState,
  reducers: {
    setInstruments: (state, action: PayloadAction<GetAllInstruments>) => {
      state.instruments = action.payload;
    },
  },
});

export const { setInstruments } = instrumentSlice.actions;

export const instToString = (inst: GigFormInstrument) => inst.name;
export const confineInstData = (inst: GetAllInstruments[0]) => {
  return {
    ...inst,
    musicians: inst.musicians.map((mus) => {
      return {
        id: mus.musician.id,
        name: mus.musician.name,
      };
    }),
  };
};

export const filterInstruments = (
  instruments: GetAllInstruments,
  disabled: string[],
) => {
  const filteredInstruments = instruments
    .filter((inst) => !disabled.includes(inst.name))
    .map((inst) => {
      return {
        name: inst.name,
        id: inst.id,
      };
    });
    return filteredInstruments
};

export const useInstruments = () =>
  useSelector((state: RootState) => state.instruments.instruments);
