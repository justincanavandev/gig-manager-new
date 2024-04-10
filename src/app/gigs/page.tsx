'use client'

import { api } from "~/trpc/react";
import GigCard from "../_components/gigs/GigCard";

const Gigs = () => {
  const {
    data: gigData,
    isLoading: isGigLoading,

  } = api.gig.getAll.useQuery();

  return (
    <div className="flex flex-col gap-8">
      {isGigLoading ? (
        <div>Loading...</div>
      ) : (
        gigData?.map((gig, index) => (
          <>
            <div>
              <GigCard key={gig.id} gig={gig} index={index} />
            </div>
          </>
        ))
      )}
    </div>
  );
};

export default Gigs;
