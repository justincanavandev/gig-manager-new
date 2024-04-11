import { parseDate } from "~/server/utils/helpers";
// import type { RouterOutputs } from "~/trpc/react";
import type { SingleGig } from "~/server/types/gigTypes";
import MusiciansModal from "./MusiciansModal";

/** @todo look into fixing this getAll RouterOutput. right now there's an issue w/ returning undefined and not accessing index[0] properly */

// type SingleGig = RouterOutputs["gig"]["getAll"][0]

type GigCardProps = {
  gig: SingleGig;
  index: number;
};

const GigCard = ({ gig, index }: GigCardProps) => {

  const { musicians } = gig;

  return (
    <div className="flex flex-col" key={gig.id}>
      <h2>{gig.name}</h2>
      <span>Start Time: {parseDate(gig.startTime).parsedDate}</span>
      <span>End Time: {parseDate(gig.endTime).parsedDate}</span>
      <span>Location: {gig.venue ? gig.venue.name : "TBD"}</span>
      <MusiciansModal musicians={musicians} index={index}/>
    </div>
  );
};

export default GigCard;
