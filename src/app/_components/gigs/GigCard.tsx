import { parseDate } from "~/server/utils/helpers";
import MusiciansModal from "./MusiciansModal";
import type { SingleGig } from "~/server/types/gigTypes";
import BaseButton from "../base/BaseButton";
import { getServerAuthSession } from "~/server/auth";

type GigCardProps = {
  gig: SingleGig;
  index: number;
};

const GigCard = async ({ gig, index }: GigCardProps) => {
  const session = await getServerAuthSession();
  const { musicians } = gig;
  const { parsedDate: startDate, parsedTime: startTime } = parseDate(
    gig.startTime,
  );
  const { parsedDate: endDate, parsedTime: endTime } = parseDate(gig.endTime);

  return (
    <div className="flex flex-col" key={`gigCard-gig-${gig.id}`}>
      <h2>{gig.name}</h2>
      <span>{`Start Time: ${startDate}, ${startTime}`}</span>
      <span>{`End Time: ${endDate}, ${endTime}`}</span>
      <span>Location: {gig?.venue ? gig.venue?.name : "TBD"}</span>
      <MusiciansModal musicians={musicians} index={index} />
      {session?.user.id === gig.organizerId && (
        <BaseButton as="link" href={`/gigs/${gig.id}/edit`}>
          Edit Gig
        </BaseButton>
      )}
    </div>
  );
};

export default GigCard;
