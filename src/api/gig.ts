import type { GigForm } from "~/server/types/gigTypes";

export const defaultGigForm: GigForm = {
    name: "",
    venueId: "",
    startTime: new Date(),
    endTime: new Date(),
    instrumentation: [],
    musicianIds: [],
  };