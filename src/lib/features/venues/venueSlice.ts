import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from "~/lib/store";
import type { GetAllVenuesOutput } from "~/server/types/venueTypes";

export type VenueState = {
  venues: GetAllVenuesOutput[];
};

const initialState: VenueState = {
  venues: [],
};

export const venueSlice = createSlice({
  name: "venues",
  initialState,
  reducers: {
    setVenues: (state, action: PayloadAction<GetAllVenuesOutput[]>) => {
      state.venues = action.payload;
    },
  },
});

export const { setVenues } = venueSlice.actions;

export const useVenues = () =>
  useSelector((state: RootState) => state.venues.venues);
