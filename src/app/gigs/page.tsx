"use client";

// import Link from "next/link";
import { api } from "~/trpc/react";
import { parseDate, hasDateHappened } from "~/server/utils/helpers";

const Gigs = () => {
  const { data: gigData } = api.gig.getAll.useQuery();

  return (
    <div className="flex flex-col gap-8">
      {/* <Link href={`/gigs/create`}>Gig create 1</Link> */}
      {gigData?.map(
        (gig) =>
          !hasDateHappened(gig.endTime) && (
            <div className="flex flex-col" key={gig.id}>
              <h2>{gig.name}</h2>
              <span>Start Time: {parseDate(gig.startTime).parsedDate}</span>
              <span>End Time: {parseDate(gig.endTime).parsedDate}</span>
              {gig.venue && <span>Location: {gig.venue?.name}</span>}
            </div>
          ),
      )}
    </div>
  );
};

export default Gigs;
