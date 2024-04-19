"use client";

import { useDispatch } from "react-redux";
import { setGigForm, useGigForm } from "~/lib/features/gig/gigSlice";
import { useVenues } from "~/lib/features/venues/venueSlice";


type VenueSelectorProps = {
  venueId?: string | null
}

const VenueSelector = ({ venueId }: VenueSelectorProps) => {
  const dispatch = useDispatch();
  const gigForm = useGigForm();
  const venues = useVenues();

  return (
    <>
      <label className="flex flex-col">
        Venues:
        <select
          className="w-48 border border-black"
          name="venues"
          defaultValue={venueId ? venueId : ""}
          onChange={(e) => {
            const venueId = e.target.value;
            return dispatch(
              setGigForm({
                ...gigForm,
                venueId,
              }),
            );
          }}
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
