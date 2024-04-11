import { api } from "~/trpc/server";
import StoreProvider from "~/app/StoreProvider";
import GigForm from "~/app/_components/gigs/create/GigForm";
import type { GigForm as GigFormType } from "~/server/types/gigTypes";

const GigCreate = async () => {
  const allInstruments = await api.instrument.getAll();

  const defaultGigForm: GigFormType = {
    name: "",
    venueId: "",
    startTime: new Date(),
    endTime: new Date(),
    instrumentation: [],
    musicianIds: [],
  };

  return (
    <>
      {allInstruments && (
        <StoreProvider instruments={allInstruments} gigForm={defaultGigForm}>
          <div>
            <h1>Gig create</h1>
            {/* <button className="border" onClick={handleCreateGig}>Create Gig</button> */}
            <GigForm />
          </div>
        </StoreProvider>
      )}
    </>
  );
};

export default GigCreate;
