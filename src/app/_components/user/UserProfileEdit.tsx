"use client";

import { api } from "~/trpc/react";
import InstrumentSelector from "../gigs/create/InstrumentSelector";
import { useState } from "react";
import type { GetUserById } from "~/server/types/userTypes";
import type { ChangeEvent } from "react";
import type { OneInstrument } from "~/server/types/instrumentTypes";

type DefaultUserProfile = {
  name: string;
  phoneNumber: string;
  email: string;
  instrumentIds: string[];
};

const UserProfileEdit = ({ user }: { user: GetUserById }) => {
  const { mutate: updateUser } = api.user.update.useMutation();

  const [userProfile, setUserProfile] = useState<DefaultUserProfile>({
    name: user?.name ? user.name : "",
    phoneNumber: "",
    email: user?.email ? user.email : "",
    instrumentIds: [],
  });

  const handleUpdateUser = () => {
    try {
      const { instrumentIds, name, email, phoneNumber } = userProfile;
      if (user?.name && user?.email) {

          const result = updateUser({
            name,
            email,
            instrumentIds,
            phoneNumber
          });

          return result;
      }
    } catch (error) {
      console.error("Error updating user", error);
      throw error;
    }
  };

  const selectInstrument = (e: ChangeEvent<HTMLSelectElement>) => {
    const instrument = JSON.parse(e.target.value) as OneInstrument;

    setUserProfile({
      ...userProfile,
      instrumentIds: [...userProfile.instrumentIds, instrument.id],
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        className="border"
        onChange={(e) =>
          setUserProfile({
            ...userProfile,
            name: e.target.value,
          })
        }
        value={userProfile.name}
      ></input>
      <InstrumentSelector action={selectInstrument} />
      <label className="flex flex-col">
        Phone Number
        <input
          className="border"
          onChange={(e) =>
            setUserProfile({
              ...userProfile,
              phoneNumber: e.target.value,
            })
          }
          value={userProfile.phoneNumber}
        ></input>
      </label>
      <label className="flex flex-col">
        Email
        <input
          className="border"
          onChange={(e) =>
            setUserProfile({
              ...userProfile,
              email: e.target.value,
            })
          }
          value={userProfile.email}
        ></input>
      </label>

      <button className="border" onClick={handleUpdateUser}>
        Update User
      </button>
    </div>
  );
};

export default UserProfileEdit;
