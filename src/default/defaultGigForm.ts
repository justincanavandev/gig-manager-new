import type { GigForm } from "~/server/types/gigTypes";

export const defaultGigForm: GigForm = {
  name: "",
  venue: null,
  startTime: new Date(),
  endTime: new Date(),
  instrumentation: [],
  musicians: [],
  pay: ""
};