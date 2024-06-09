import BaseRow from "../../base/BaseRow";
import type { GigForm, GigFormVenue } from "~/server/types/gigTypes";

type VenueDisplayProps = {
  setVenue: <Value>(key: keyof GigForm, value: Value) => void;
  venue: GigFormVenue;
};

const VenueDisplay = ({ venue, setVenue }: VenueDisplayProps) => {
  return (
    <div className="flex h-fit w-[300px] max-w-[400px] flex-col rounded-md bg-dark-purple px-2 pb-2 pt-1.5 shadow-lg sm:w-[90%]">
      <div className="flex">
        <h3 className="relative w-1/2 pb-0.5 pl-1 text-[.7rem] uppercase">
          Venue
        </h3>
      </div>
      {venue && (
        <BaseRow
          requiredName={venue.name}
          action={() => setVenue("venue", null)}
        />
      )}
    </div>
  );
};

export default VenueDisplay;
