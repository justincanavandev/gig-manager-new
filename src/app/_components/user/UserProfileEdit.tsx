"use client";

import { api } from "~/trpc/react";
import InstrumentSelector from "../gigs/create/InstrumentSelector";
import type { GetUserById } from "~/server/types/userTypes";
import type { ChangeEvent } from "react";
import type { OneInstrument } from "~/server/types/instrumentTypes";
import FormInput from "../base/FormInput";
import useForm from "~/app/hooks/useForm";
import type { GigFormInstrument } from "~/server/types/gigTypes";

type DefaultUserProfile = {
  name: string;
  phoneNumber: string;
  email: string;
  instruments: {
    id: string;
    name: string;
  }[];
};

const UserProfileEdit = ({ user }: { user: GetUserById }) => {
  const { mutate: updateUser } = api.user.update.useMutation();

  const { form, handleChange, setForm } = useForm<DefaultUserProfile>({
    name: user?.name ? user.name : "",
    phoneNumber: "",
    email: user?.email ? user.email : "",
    instruments: user?.musician?.instruments
      ? user.musician.instruments.map((inst) => {
          return {
            id: inst.instrument.id,
            name: inst.instrument.name,
          };
        })
      : [],
  });

  console.log("form", form);

  const handleUpdateUser = () => {
    try {
      const { instruments, name, email, phoneNumber } = form;
      if (user?.name && user?.email) {
        const result = updateUser({
          name,
          email,
          instrumentIds: instruments.map((inst) => inst.id),
          phoneNumber,
        });

        return result;
      }
    } catch (error) {
      console.error("Error updating user", error);
      throw error;
    }
  };

  const addInstrument = (e: ChangeEvent<HTMLSelectElement>) => {
    const instrument = JSON.parse(e.target.value) as OneInstrument;
    setForm({
      ...form,
      instruments: [...form.instruments, instrument],
    });
  };

  const deleteInst = (inst: GigFormInstrument) => {
    const { instruments } = form;
    const filteredInsts = instruments.filter(
      (instrument) => instrument.name !== inst.name,
    );

    setForm({
      ...form,
      instruments: filteredInsts,
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <FormInput
        value={form.name}
        action={(e) => handleChange(e)}
        label="Name"
        name="name"
        placeholder="John Smith"
      ></FormInput>
      <InstrumentSelector
        addInst={addInstrument}
        deleteInst={deleteInst}
        currentInsts={form.instruments}
      />

      <FormInput
        action={(e) => handleChange(e)}
        name="phoneNumber"
        label="Phone Number"
        value={form.phoneNumber}
        placeholder="123-456-7890"
      ></FormInput>

      <FormInput
        action={(e) => handleChange(e)}
        label="Email"
        name="email"
        placeholder="johnsmith@gmail.com"
        value={form.email}
      ></FormInput>

      <button className="border" onClick={handleUpdateUser}>
        Update User
      </button>
    </div>
  );
};

export default UserProfileEdit;
