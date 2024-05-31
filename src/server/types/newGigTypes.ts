export interface GigCardType {
    id:              string;
    name:            string;
    startTime:       Date;
    endTime:         Date;
    venueId:         string;
    organizerId:     string;
    pay:             number;
    organizer:       Organizer;
    venue:           Venue;
    musicians:       Musician[];
    instrumentation: Instrumentation[];
}

export interface Instrumentation {
    gigId:        string;
    instrumentId: string;
    instrument:   MusicianOrInst;
}

export interface Organizer {
    name: string | null;
}

export interface MusicianOrInst {
    name: string
}

export interface Musician {
    musicianId:   string;
    gigId:        string;
    instrumentId: string;
    musician:     MusicianOrInst;
    instrument:   MusicianOrInst;
}

export type Venue = {
    name: string;
} | null
