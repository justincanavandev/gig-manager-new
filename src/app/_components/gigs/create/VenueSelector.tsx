"use client";

import { useVenues } from "~/lib/features/venues/venueSlice";
import type { ChangeEvent } from "react";

type VenueSelectorProps = {
  venueId?: string | null;
  setVenue: (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

const VenueSelector = ({ venueId, setVenue }: VenueSelectorProps) => {
  const venues = useVenues();

  return (
    <>
      <label className="flex flex-col">
        Venues:
        <select
          className="w-48 border border-black"
          name="venueId"
          defaultValue={venueId ? venueId : ""}
          onChange={(e) =>
            setVenue(e)
          }
        >
          <option value="">Select a Venue</option>
          {venues?.map((venue) => (
            <option key={`${venue.name}-select`} value={venue.id}>
              {venue.name}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

export default VenueSelector;
