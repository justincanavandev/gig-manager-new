import type { RouterOutputs } from "~/trpc/react";

export type GetAllGigsOutput = RouterOutputs["gig"]["getAll"];
export type SingleGig = RouterOutputs["gig"]["getAll"][0];
export type GigById = RouterOutputs["gig"]["getById"];

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

export type GigFormInstrument = {
  name: string;
  id: string;
  musicians?: InstrumentationMusician[]
};

export type GigFormMusician = {
  instrument: GigFormInstrument
  id: string;
  name: string
};

export type InstrumentationMusician = {
  id: string;
  name: string
}

export type GigFormVenue = {
  name: string
  id: string
} | null

export type GigForm = {
  name: string;
  venue: GigFormVenue
  startTime: Date
  endTime: Date
  instrumentation: GigFormInstrument[]
  musicians: GigFormMusician[]
  pay: number
};
