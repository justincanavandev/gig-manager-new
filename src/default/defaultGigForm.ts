import type { GigForm } from "~/server/types/gigTypes";

export const defaultGigForm: GigForm = {
  name: "",
  venue: null,
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  instrumentation: [],
  musicians: [],
};