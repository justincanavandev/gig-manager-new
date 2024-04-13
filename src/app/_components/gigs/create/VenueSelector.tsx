"use client";

import { useDispatch } from "react-redux";
import { setGigForm, useGigForm } from "~/lib/features/gig/gigSlice";
import { useVenues } from "~/lib/features/venues/venueSlice";

const VenueSelector = () => {
  const dispatch = useDispatch();
  const gigForm = useGigForm();
  const venues = useVenues();

  return (
    <>
      <label>
        Venues:
        <select
          className="border border-black"
          name="venues"
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
