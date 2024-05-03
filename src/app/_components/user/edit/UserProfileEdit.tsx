"use client";

import { api } from "~/trpc/react";
import type { GetUserById } from "~/server/types/userTypes";
import FormInput from "../../base/FormInput";
import useForm from "~/app/hooks/useForm";
import type { GigFormInstrument } from "~/server/types/gigTypes";
import { useInstruments } from "~/lib/features/instrument/instrumentSlice";
import BaseCombobox from "../../base/BaseCombobox";
import { instToString } from "~/lib/features/instrument/instrumentSlice";
import { filterInstruments } from "~/lib/features/instrument/instrumentSlice";

export type DefaultUserProfile = {
  name: string;
  phoneNumber: string;
  email: string;
  instrumentation: GigFormInstrument[];
};

const UserProfileEdit = ({ user }: { user: GetUserById }) => {
  const instruments = useInstruments();
  const utils = api.useUtils();
  const { mutate: updateUser } = api.user.update.useMutation({
    onSuccess: async () => {
      await utils.user.getById.invalidate();
    },
  });

  const { form, handleChange, setForm, updateValue } =
    useForm<DefaultUserProfile>({
      name: user?.name ? user.name : "",
      phoneNumber: "",
      email: user?.email ? user.email : "",
      instrumentation: user?.musician?.instruments
        ? user.musician.instruments.map((inst) => {
            return {
              id: inst.instrument.id,
              name: inst.instrument.name,
            };
          })
        : [],
    });

  const addInstrument = (inst: GigFormInstrument) => {
    if (inst) {
      updateValue("instrumentation", inst, "add");
    }
  };

  const handleUpdateUser = () => {
    try {
      const { instrumentation, name, email, phoneNumber } = form;

      const result = updateUser({
        name,
        email,
        instrumentIds: instrumentation.map((inst) => inst.id),
        phoneNumber,
      });

      return result;
    } catch (error) {
      console.error("Error updating user", error);
      throw error;
    }
  };

  const deleteInst = (inst: GigFormInstrument) => {
    const { instrumentation } = form;
    const filteredInsts = instrumentation.filter(
      (instrument) => instrument.name !== inst.name,
    );

    setForm({
      ...form,
      instrumentation: filteredInsts,
    });
  };

  const currentInstNames = form.instrumentation.map((inst) => inst.name);
  const filteredInstruments = filterInstruments(instruments, currentInstNames);

  return (
    <div className="flex flex-col items-center gap-4">
      <FormInput
        value={form.name}
        action={(e) => handleChange(e)}
        label="Name"
        name="name"
        placeholder="John Smith"
      ></FormInput>

      <BaseCombobox
        data={filteredInstruments}
        disabledData={form.instrumentation}
        dataToString={instToString}
        label="Instrumentation"
        action={addInstrument}
        action2={deleteInst}
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
