"use client";

import { api } from "~/trpc/react";
import InstrumentSelector from "../gigs/create/InstrumentSelector";
import { useState } from "react";
import type { GetUserById } from "~/server/types/userTypes";
import type { ChangeEvent } from "react";

type DefaultUserProfile = {
  phoneNumber: string;
  instrumentIds: string[];
};

const UserProfileEdit = ({ user }: { user: GetUserById }) => {
  const { mutate: updateUser } = api.user.update.useMutation();
  // const musician = user?.musician ? user.musician : null


  const [userProfile, setUserProfile] = useState<DefaultUserProfile>({
    // phoneNumber: user?.phoneNumber,
    // instrumentIds: user?.instruments
    //   .map((inst) => inst.instrument)
    //   .map((ins) => ins.id),
    phoneNumber: "",
    instrumentIds: [],
  });

  const handleUpdateUser = () => {
    try {
      const { instrumentIds } = userProfile;
      if (user?.name && user?.email) {
        const { name, email } = user;
        if (instrumentIds) {
          const result = updateUser({
            name,
            email,
            instrumentIds,
            phoneNumber: "210-218-8720",
          });

          return result;
        }
      }
    } catch (error) {
      console.error("Error updating user", error);
      throw error;
    }
  };

  const selectInstrument = (e: ChangeEvent<HTMLSelectElement>) => {
    if (userProfile.instrumentIds) {
      setUserProfile({
        ...userProfile,
        instrumentIds: [...userProfile.instrumentIds, e.target.value],
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
  

      <InstrumentSelector action={selectInstrument} nameOrId="id" />
      <button onClick={handleUpdateUser}>Update User</button>
    </div>
  );
};

export default UserProfileEdit;
