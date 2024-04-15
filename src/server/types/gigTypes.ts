import type { RouterOutputs } from "~/trpc/react";

export type GetAllGigsOutput = RouterOutputs['gig']['getAll']
export type SingleGig = RouterOutputs["gig"]["getAll"][0]


export type MusiciansFromAllGigs = {
  musician: {
    name: string;
    instruments: {
      instrument: {
        id: string;
        name: string;
      };
    }[];
  };
  musicianId: string;
  gigId: string;
}[];

export type GigForm = {
  name: string;
  venueId: string;
  startTime: string;
  endTime: string;
  instrumentation: string[];
  musicianIds: string[];
};
