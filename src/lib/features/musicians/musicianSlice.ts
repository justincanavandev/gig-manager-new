import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from "~/lib/store";
import type { MusicianType } from "~/server/types/musicianTypes";

export type MusicianState = {
  musicians: MusicianType[];
};

const initialState: MusicianState = {
  musicians: [
    {
      id: "",
      name: "",
      phoneNumber: "",
      email: "",
      instruments: [
        {
          instrument: {
            name: "",
          },
        },
      ],
    },
  ],
};

export const musicianSlice = createSlice({
  name: "musicians",
  initialState,
  reducers: {
    setMusicians: (state, action: PayloadAction<MusicianType[]>) => {
      state.musicians = action.payload;
    },
  },
});

export const { setMusicians } = musicianSlice.actions;

export const useMusicians = () =>
  useSelector((state: RootState) => state.musicians.musicians);
