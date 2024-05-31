import { parseDate } from "~/server/utils/helpers";
import MusiciansModal from "./MusiciansModal";
import type { SingleGig } from "~/server/types/gigTypes";
import BaseButton from "../base/BaseButton";
import { getServerAuthSession } from "~/server/auth";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

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

  /** @todo Deal with if endDate !== startDate */

  const { parsedDate: endDate, parsedTime: endTime } = parseDate(gig.endTime);


  return (
    <div className="flex justify-between w-full pl-8 py-1 text-[.7rem]" key={`gigCard-gig-${gig.id}`}>
      <span className="w-[14.28%] pr-1 truncate">{gig.name}</span>
      <span className="w-[14.28%] pr-1 truncate">{startDate}</span>
      <span className="w-[14.28%] pr-1 truncate">{startTime}</span>
      <span className="w-[14.28%] pr-1 truncate">{endTime}</span>
      <span className="w-[14.28%] pr-1 truncate">{gig?.venue ? gig.venue?.name : "TBD"}</span>
      <span className="w-[14.28%] pr-1">{gig.pay}</span>
      <span className="w-[14.28%] pr-1 truncate">{gig.organizer.name}</span>
      
      <div className="flex gap-2 w-[120px]">
      <MusiciansModal musicians={musicians} index={index} />
      {session?.user.id === gig.organizerId && (
        <BaseButton className="h-5 w-5" as="link" href={`/gigs/${gig.id}/edit`}>
          <PencilSquareIcon/>
        </BaseButton>
      )}
      </div>
    </div>


  );
};

export default GigCard;
