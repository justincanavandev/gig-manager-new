import { parseDate } from "~/server/utils/helpers";
import MusiciansModal from "./MusiciansModal";
// import type { SingleGig } from "~/server/types/gigTypes";
import BaseButton from "../base/BaseButton";
import { getServerAuthSession } from "~/server/auth";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import type { GigCardType } from "~/server/types/newGigTypes";

type GigCardProps = {
  gig: GigCardType;
  index: number;
};

const GigCard = async ({ gig, index }: GigCardProps) => {
  const session = await getServerAuthSession();
  const { musicians } = gig;
  const { parsedDate: startDate, parsedTime: startTime } = parseDate(
    gig.startTime,
  );

  /** @todo Deal with if endDate !== startDate */

  const { parsedTime: endTime } = parseDate(gig.endTime);

  return (
    <div
      className="flex w-full text-[.57rem] sm:text-[.7rem] justify-between py-1 px-2 sm:pl-2"
      key={`gigCard-gig-${gig.id}`}
    >
      <span className="w-[33.33%] sm:w-[15.5%] truncate pr-1">{gig.name}</span>
      <span className="w-[33.33%] sm:w-[15.5%] truncate pr-1">{startDate}</span>
      <span className="sm:w-[15.5%] truncate pr-1 hidden sm:block">{startTime}</span>
      <span className="sm:w-[15.5%] truncate pr-1 hidden sm:block">{endTime}</span>
      <span className="w-[33.33%] sm:w-[15.5%] truncate pr-1">
        {gig?.venue?.name ?? "TBD"}
      </span>
      <span className="sm:w-[7%] pr-1 hidden sm:block">{gig.pay}</span>
      <span className="sm:w-[15.5%] truncate pr-1 hidden sm:block">{gig.organizer.name}</span>

      <div className="sm:w-[50px] gap-2 hidden sm:flex">
        <MusiciansModal musicians={musicians} index={index} />
        {session?.user.id === gig.organizerId && (
          <BaseButton
            className="h-5 w-5"
            as="link"
            href={`/gigs/${gig.id}/edit`}
          >
            <PencilSquareIcon />
          </BaseButton>
        )}
      </div>
    </div>
  );
};

export default GigCard;
