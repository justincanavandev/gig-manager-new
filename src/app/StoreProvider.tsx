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
import type { MusicianType } from "~/server/types/musicianTypes";
import { setMusicians } from "~/lib/features/musicians/musicianSlice";

export default function StoreProvider({
  instruments,
  gigForm,
  children,
  venues,
  musicians,
}: {
  instruments: Instrument[];
  venues: VenueType[];
  musicians: MusicianType[];
  gigForm: GigForm;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(setGigForm(gigForm));
    storeRef.current.dispatch(setInstruments(instruments));
    storeRef.current.dispatch(setVenues(venues));
    storeRef.current.dispatch(setMusicians(musicians))
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
