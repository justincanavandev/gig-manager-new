"use client";

import { api } from "~/trpc/react";

const Musicians = () => {
  const { mutate: addMusician } = api.musician.create.useMutation();

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

  return (
    <div>
      <button onClick={handleCreateMusician}>Create</button>
    </div>
  );
};

export default Musicians;
