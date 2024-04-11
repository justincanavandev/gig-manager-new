import { api } from "~/trpc/server";
import StoreProvider from "~/app/StoreProvider";
import GigForm from "~/app/_components/gigs/create/GigForm";
import type { GigForm as GigFormType } from "~/server/types/gigTypes";

const GigCreate = async () => {
  // const { mutate: createGig } = api.gig.create.useMutation();
  const allInstruments = await api.instrument.getAll();


  // const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
  //   const { name, value } = e.target
  //   setGigForm((prevFormData: GigForm) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }))
  // }

  // const handleCreateGig = () => {
  //   const dateNow = new Date();
  //   const result = createGig({
  //     name: "gig 3",
  //     startTime: dateNow,
  //     endTime: dateNow,
  //     venue: "gig 1",
  //     musicianIds: ["clullr7rl000050el2mv5d1f1", "clullucsa000250elpf5nr8qp"],
  //     instruments: ["Guitar"],
  //   });
  //   return result;
  // };

  const defaultGigForm: GigFormType = {
    name: "",
    venueId: "",
    startTime: new Date(),
    endTime: new Date(),
    instrumentation: [],
    musicianIds: [],
  };

  return (
    <StoreProvider gigForm={defaultGigForm}>
      <div>
        <h1>Gig create</h1>
        {/* <button className="border" onClick={handleCreateGig}>Create Gig</button> */}
        <GigForm instruments={allInstruments ? allInstruments : []} />
        {/* <label>
        Instrumentation:
        <select
          className="border border-black"
          name="instrumentation"
          // onChange={(e) => addInstrument(e)}
          // onChange={(e) => {
          //   return dispatch(
          //     setGigForm({
                
          //     }),
          //   );
          // }}
        >
          <option value="">Select an instrument</option>
          {allInstruments?.map((instrument) => (
            <option key={`${instrument.name}-select`} value={instrument.name}>
              {instrument.name}
            </option>
          ))}
        </select>
      </label> */}
      </div>
    </StoreProvider>
  );
};

export default GigCreate;
