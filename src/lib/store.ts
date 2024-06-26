import { configureStore } from "@reduxjs/toolkit";
import { instrumentSlice } from "./features/instrument/instrumentSlice";
import { venueSlice } from "./features/venues/venueSlice";
import { musicianSlice } from "./features/musicians/musicianSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      instruments: instrumentSlice.reducer,
      venues: venueSlice.reducer,
      musicians: musicianSlice.reducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
