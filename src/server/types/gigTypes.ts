export type SingleGig = {
    id: string;
    name: string;
    startTime: Date;
    endTime: Date;
    venue: { name: string } | null;
    musicians: {
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
    instrumentation: {
      gigId: string;
      instrumentId: string;
      instrument: { name: string };
    }[];
  };