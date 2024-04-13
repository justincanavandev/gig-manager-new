import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from "~/lib/store";
import type { VenueType } from "~/server/types/venueTypes";

export type VenueState = {
  venues: VenueType[];
};

const initialState: VenueState = {
  venues: [
    {
      id: "",
      name: "",
      location: {
        id: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        venueId: "",
      },
    },
  ],
};

export const venueSlice = createSlice({
  name: "venues",
  initialState,
  reducers: {
    setVenues: (state, action: PayloadAction<VenueType[]>) => {
      state.venues = action.payload;
    },
  },
});

export const { setVenues } = venueSlice.actions;

export const useVenues = () => useSelector((state: RootState) => state.venues.venues);
