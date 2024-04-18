import { api } from "~/trpc/server";
import GigForm from "~/app/_components/gigs/create/GigForm";

const GigEdit = async ({ params }: { params: { gigId: string } }) => {
  const gig = await api.gig.getById({
    id: params.gigId,
  });

  return (
    <>
      <GigForm gig={gig} />
    </>
  );
};

export default GigEdit;
