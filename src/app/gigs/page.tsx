import { api } from "~/trpc/server";
import GigCard from "../_components/gigs/GigCard";

const Gigs = async () => {
  const gigData = await api.gig.getAll();

  return (
    <div className="flex flex-col gap-8">
      {gigData?.map((gig, index) => (
        <GigCard key={gig.id} gig={gig} index={index} />
      ))}
    </div>
  );
};

export default Gigs;
