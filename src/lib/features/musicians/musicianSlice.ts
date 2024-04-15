import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from "~/lib/store";
import type { GetAllMusiciansOutput } from "~/server/types/musicianTypes";

export type MusicianState = {
  musicians: GetAllMusiciansOutput[];
};

const initialState: MusicianState = {
  musicians: [],
};

export const musicianSlice = createSlice({
  name: "musicians",
  initialState,
  reducers: {
    setMusicians: (state, action: PayloadAction<GetAllMusiciansOutput[]>) => {
      state.musicians = action.payload;
    },
  },
});

export const { setMusicians } = musicianSlice.actions;

export const useMusicians = () =>
  useSelector((state: RootState) => state.musicians.musicians);
