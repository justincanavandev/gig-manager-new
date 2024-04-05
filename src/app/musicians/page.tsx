"use client";

import { api } from "~/trpc/react";

const Musicians = () => {
  const { mutate: addMusician } = api.musician.create.useMutation();
  const { mutate: createGig } = api.gig.create.useMutation();

  const handleCreateMusician = () => {
    try {
      const result = addMusician({
        name: "Justin",
        instrument: "Guitar",
        phoneNumber: "210-218-8720",
        email: "jcanavan@gmail.com",
      });

      return result;
    } catch (error) {
      console.error("Error creating musician", error);
      throw error;
    }
  };

  const handleCreateGig = () => {
    const dateNow = new Date();
    const result = createGig({
      name: "gig 2",
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
      <button onClick={handleCreateMusician}>Create Musician</button>
      <button onClick={handleCreateGig}>Create Gig</button>
    </div>
  );
};

export default Musicians;
