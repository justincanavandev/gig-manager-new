import type { GigForm } from "~/server/types/gigTypes";

export const defaultGigForm: GigForm = {
  name: "",
  venueId: "",
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  instrumentation: [],
  musicians: [],
};