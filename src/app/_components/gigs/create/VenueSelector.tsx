"use client";

import { useVenues } from "~/lib/features/venues/venueSlice";
import BaseCombobox from "../../base/BaseCombobox";
import type { GigForm, GigFormVenue } from "~/server/types/gigTypes";

type VenueSelectorProps = {
  setVenue: <Value>(key: keyof GigForm, value: Value) => void;
  venue: GigFormVenue;
};

const VenueSelector = ({ setVenue, venue }: VenueSelectorProps) => {
  const venues = useVenues();

  const venueToString = (venue: GigFormVenue) => venue?.name ?? "";

  const changeVenue = (venue: GigFormVenue) => {
    if (venue) {
      setVenue("venue", venue);
    }
  };

  const deleteVenue = (venue: GigFormVenue) => {
    if (venue) {
      setVenue("venue", null);
    }
  };

  const enabledVenues = venues.filter((v)=> v.name !== venue?.name)


  return (
    <>
      <BaseCombobox
        data={enabledVenues}
        value={venue ?? null}
        disabledData={venue ? [venue] : []}
        dataToString={venueToString}
        label="Venue"
        action={changeVenue}
        action2={deleteVenue}
      />
    </>
  );
};

export default VenueSelector;
