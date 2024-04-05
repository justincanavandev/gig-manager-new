"use client";

import { api } from "~/trpc/react";

const GigCreate = () => {
  const { mutate: createGig } = api.gig.create.useMutation();

  const handleCreateGig = () => {
    const dateNow = new Date();
    const result = createGig({
      name: "gig 3",
      startTime: dateNow,
      endTime: dateNow,
      venue: "gig 1",
      musicianIds: ["clullr7rl000050el2mv5d1f1", "clullucsa000250elpf5nr8qp"],
      instruments: ["Guitar"],
    });
    return result;
  };
  return (
    <div>
      <h1>Gig create</h1>
      <button className="border" onClick={handleCreateGig}>Create Gig</button>
    </div>
  );
};

export default GigCreate;
