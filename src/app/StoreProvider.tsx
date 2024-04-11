"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
import { setGigForm } from "~/lib/features/gig/gigSlice";
import type { GigForm } from "~/server/types/gigTypes";
import type { AppStore } from "../lib/store";

export default function StoreProvider({
  gigForm,
  children,
}: {
  gigForm: GigForm;
  children: React.ReactNode;
}) {
  
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(setGigForm(gigForm));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
