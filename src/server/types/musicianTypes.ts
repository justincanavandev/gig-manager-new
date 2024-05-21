import type { RouterOutputs } from "~/trpc/react";

export type GetAllMusicians = RouterOutputs["musician"]["getAll"];
export type MusicianGetAllGigs = {
    musician: {
      name: string;
    },
    instrument: {
        name: string;
    };
    musicianId: string;
    gigId: string;
    instrumentId: string;
  }[];
