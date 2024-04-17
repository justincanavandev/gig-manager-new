import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from "~/lib/store";
import type { GetAllMusicians } from "~/server/types/musicianTypes";

export type MusicianState = {
  musicians: GetAllMusicians;
};

const initialState: MusicianState = {
  musicians: [],
};

export const musicianSlice = createSlice({
  name: "musicians",
  initialState,
  reducers: {
    setMusicians: (state, action: PayloadAction<GetAllMusicians>) => {
      state.musicians = action.payload;
    },
  },
});

export const { setMusicians } = musicianSlice.actions;

export const useMusicians = () =>
  useSelector((state: RootState) => state.musicians.musicians);
