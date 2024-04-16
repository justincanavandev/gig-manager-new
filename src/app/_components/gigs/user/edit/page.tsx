"use client";

import { api } from "~/trpc/react";
import InstrumentSelector from "../../create/InstrumentSelector";
import { useState } from "react";
import type { GetUserById } from "~/server/types/userTypes";
import type { ChangeEvent } from "react";

const UserProfileEdit = ({ user }: { user: GetUserById }) => {
  const { mutate: updateUser } = api.user.update.useMutation();

  const [userProfile, setUserProfile] = useState({
    phoneNumber: user?.phoneNumber,
    instrumentIds: user?.instruments
      .map((inst) => inst.instrument)
      .map((ins) => ins.id),
  });

  console.log('userProfile', userProfile)

  const handleUpdateUser = () => {
    try {
      const { instrumentIds } = userProfile;
      if (instrumentIds) {
        const result = updateUser({
          instrumentIds,
          phoneNumber: "210-218-8720",
      
        });

        return result;
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
    <div className="flex">
      <InstrumentSelector action={selectInstrument} nameOrId="id" />
      <button onClick={handleUpdateUser}>Update User</button>
    </div>
  );
};

export default UserProfileEdit;
