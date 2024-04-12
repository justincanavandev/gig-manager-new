"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
import { setGigForm } from "~/lib/features/gig/gigSlice";
import type { GigForm } from "~/server/types/gigTypes";
import type { AppStore } from "../lib/store";
import { setInstruments } from "~/lib/features/instrument/instrumentSlice";
import type { Instrument } from "@prisma/client";
import type { VenueType } from "~/server/types/venueTypes";
import { setVenues } from "~/lib/features/venues/venueSlice";

export default function StoreProvider({
  instruments,
  gigForm,
  children,
  venues
}: {
  instruments: Instrument[]
  venues: VenueType[]
  gigForm: GigForm;
  children: React.ReactNode;
}) {
  
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(setGigForm(gigForm));
    storeRef.current.dispatch(setInstruments(instruments))
    storeRef.current.dispatch(setVenues(venues))
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
