import type { RouterOutput } from "~/trpc/react";

export type GetAllMusiciansOutput = RouterOutput["musician"]["getAll"];

export type InstrumentName = {
  instrument: {
    name: string;
  };
};

export type MusicianType = {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  instruments: InstrumentName[];
};
