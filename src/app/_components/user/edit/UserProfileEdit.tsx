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
import BaseButton from "../../base/BaseButton";
import toast from "react-hot-toast";
import { displayTRPCError } from "../../../error/errorHelpers";
import { UserProfileSchema } from "~/app/validation/userProfileSchema";
import { phoneValidation } from "~/app/validation/validationHelpers";
import z from "zod";
import { ValidationError } from "zod-validation-error";
import { userProfileErrors } from "~/app/validation/validationHelpers";

export type DefaultUserProfile = {
  name: string;
  phoneNumber: string;
  email: string;
  instrumentation: GigFormInstrument[];
};

interface EditProfileProps {
  user: GetUserById;
  musicianAdd?: boolean;
  closeMusicianModal?: () => void;
}

const UserProfileEdit = ({
  user,
  musicianAdd,
  closeMusicianModal,
}: EditProfileProps) => {
  const instruments = useInstruments();
  const utils = api.useUtils();
  const { mutate: connectMusician } = api.user.connectMusician.useMutation({
    onMutate: (musician) => {
      toast.loading(`Adding ${musician.name}`);
    },
    onSuccess: async (musician) => {
      await utils.user.getById.invalidate();
      toast.dismiss();
      toast.success(
        `${musician?.name ?? "Musician"} was added to the database!`,
      );
      if (closeMusicianModal) {
        closeMusicianModal();
      }
    },
    onError: (e) => {
      const message = displayTRPCError(e.data, e.message);
      toast.dismiss();
      toast.error(message);
    },
  });
  const { mutate: updateUser } = api.user.updateUser.useMutation({
    onMutate: (user) => {
      toast.loading(`Updating ${user.name}'s profile!`);
    },
    onSuccess: async (user) => {
      await utils.user.getById.invalidate();
      toast.dismiss();
      toast.success(`${user.name}'s profile was updated!`);
    },
    onError: (e) => {
      const message = displayTRPCError(e.data, e.message);
      toast.dismiss();
      toast.error(message);
    },
  });

  const {
    form,
    handleChange,
    setForm,
    updateValue,
    validate,
    errorMessages,
    displayFormError,
  } = useForm<DefaultUserProfile>(
    {
      name: user?.name ? user.name : "",
      phoneNumber: user?.musician ? user.musician?.phoneNumber : "",
      email: user?.email ? user.email : "",
      instrumentation: user?.musician?.instruments
        ? user.musician.instruments.map((inst) => {
            return {
              id: inst.instrument.id,
              name: inst.instrument.name,
            };
          })
        : [],
    },
    UserProfileSchema,
  );

  const addInstrument = (inst: GigFormInstrument) => {
    if (inst) {
      updateValue("instrumentation", inst, "add");
    }
  };

  const handleUpdateUser = () => {
    try {
      const { instrumentation, name, email, phoneNumber } = form;

      const validateOrError = validate(form);

      if (validateOrError instanceof ValidationError) {
        const message = validateOrError.toString();

        toast.error(message);
      } else {
        const instrumentIds = instrumentation.map((inst) => inst.id);

        if (!user?.musician && musicianAdd) {
          // Adds Musician to db and connects Musician to User
          const result = connectMusician({
            name,
            email,
            instrumentIds,
            phoneNumber,
          });

          return result;
        } else {
          // Updates Musician who is already connected to user or updates User who is NOT connected to a musician

          const updatedUser = updateUser({
            name,
            email,
            musician: user?.musician?.id
              ? {
                  instrumentIds,
                  phoneNumber,
                  musicianId: user.musician.id,
                }
              : null,
          });
          return updatedUser;
        }
      }
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
        condition={displayFormError(
          "name",
          form.name,
          z.string().min(3),
          userProfileErrors.name,
        )}
        errors={errorMessages?.name ?? []}
      ></FormInput>

      {(user?.musician ?? musicianAdd) && (
        <BaseCombobox
          data={filteredInstruments}
          disabledData={form.instrumentation}
          dataToString={instToString}
          label="Instrumentation"
          action={addInstrument}
          action2={deleteInst}
        />
      )}
      {(user?.musician ?? musicianAdd) && (
        <FormInput
          action={(e) => handleChange(e)}
          name="phoneNumber"
          label="Phone Number"
          value={form.phoneNumber}
          type="number"
          placeholder="123-456-7890"
          condition={displayFormError(
            "phoneNumber",
            form.phoneNumber,
            phoneValidation,
            userProfileErrors.phoneNumber,
          )}
          errors={errorMessages?.phoneNumber ?? []}
        ></FormInput>
      )}

      <FormInput
        action={(e) => handleChange(e)}
        label="Email"
        name="email"
        type="text"
        placeholder="johnsmith@gmail.com"
        value={form.email}
        condition={displayFormError(
          "email",
          form.email,
          z.string().email(),
          userProfileErrors.email,
        )}
        errors={errorMessages?.email ?? []}
      ></FormInput>

      <BaseButton as="button" className="border" onClick={handleUpdateUser}>
        Update User
      </BaseButton>
    </div>
  );
};

export default UserProfileEdit;
