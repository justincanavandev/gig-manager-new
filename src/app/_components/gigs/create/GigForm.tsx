"use client";

import type { GigForm, GigFormInstrument } from "~/server/types/gigTypes";
import DateSelector from "./DateSelector";
import VenueSelector from "./VenueSelector";
import MusicianSelector from "./MusicianSelector";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import type { GigById } from "~/server/types/gigTypes";
import FormInput from "../../base/FormInput";
import { defaultGigForm } from "~/default/defaultGigForm";
import useForm from "~/app/hooks/useForm";
import { useInstruments } from "~/lib/features/instrument/instrumentSlice";
import type {
  InstrumentName,
  OneInstrument,
} from "~/server/types/instrumentTypes";
import type { MusicianSelect } from "~/server/types/instrumentTypes";
import { isInstrumentValid } from "~/server/utils/typeGuards";
import BaseButton from "../../base/BaseButton";
import toast from "react-hot-toast";
import { displayTRPCError, getZodErrMsg } from "../../../error/errorHelpers";
import { GigFormSchema } from "~/app/validation/gigFormSchema";
import { z } from "zod";
import { gigFormErrors } from "~/app/validation/validationHelpers";
import InstrumentSelector from "./InstrumentSelector";
import {
  doesInstrumentHaveMusician,
  displayMusicianNames,
} from "~/server/utils/musicianHelpers";
import { isValidationErrorLike } from "zod-validation-error";
import MusicianDisplay from "./MusicianDisplay";
import type { GigFormMusician } from "~/server/types/gigTypes";

type GigFormProps = {
  gig?: GigById;
};

const GigForm = ({ gig }: GigFormProps) => {
  const {
    form,
    setForm,
    handleChange,
    updateValue,
    changeValue,
    validate,
    errorMessages,
    displayFormError,
    isFormSubmitted,
    setFormSubmitTrue,
    setErrorMessages,
  } = useForm<GigForm>(defaultGigForm, GigFormSchema);

  const instruments = useInstruments();
  const utils = api.useUtils();

  const instsWithoutMusician = doesInstrumentHaveMusician(
    form.musicians,
    form.instrumentation,
  );

  const { mutate: createGig } = api.gig.create.useMutation({
    onMutate: (gig) => {
      toast.loading(`${gig.name} is being created!`);
    },
    onSuccess: async (gig) => {
      await utils.gig.getAll.invalidate();
      await utils.gig.getById.invalidate();
      toast.dismiss();
      toast.success(`${gig?.name ?? "Gig"} was successfully created!`);
      setForm(defaultGigForm);
    },
    onError: (e) => {
      const message = displayTRPCError(e.data, e.message);
      toast.dismiss();
      toast.error(message);
    },
  });

  const { mutate: updateGig } = api.gig.update.useMutation({
    onMutate: (gig) => {
      toast.loading(`${gig.name} is being updated!`);
    },
    onSuccess: async (gig) => {
      await utils.gig.getAll.invalidate();
      await utils.gig.getById.invalidate();
      toast.dismiss();
      toast.success(`${gig.name} was successfully edited!`);
    },
    onError: (e) => {
      const message = displayTRPCError(e.data, e.message);
      toast.dismiss();
      toast.error(message);
    },
  });

  const [isMusSelectOpen, setIsMusSelectOpen] = useState<
    Partial<MusicianSelect>
  >({});

  const addInstrument = (inst: GigFormInstrument) => {
    if (inst?.name) {
      const formInsts = form.instrumentation.map((inst) => inst.name);

      if (!formInsts.includes(inst?.name)) {
        updateValue("instrumentation", inst, "add");
      }
      if (isInstrumentValid(inst?.name))
        setIsMusSelectOpen((prev) => {
          return {
            ...prev,
            [`${inst.name}`]: true,
          };
        });
    }
  };

  useEffect(() => {
    if (gig) {
      const {
        name,
        startTime,
        endTime,
        instrumentation,
        musicians,
        venue,
        pay,
      } = gig;
      const confinedMusicians = musicians.map((mus) => {
        return {
          instrument: {
            name: mus.instrument.name,
            id: mus.instrumentId,
          },
          id: mus.musicianId,
          name: mus.musician.name,
        };
      });

      const confinedInstrumentation = instrumentation.map((inst) => {
        return {
          name: inst.instrument.name,
          id: inst.instrumentId,
          musicians: inst.instrument.musicians.map((mus) => {
            return {
              name: mus.musician.name,
              id: mus.musician.id,
            };
          }),
        };
      });

      setForm({
        name,
        venue,
        startTime,
        endTime,
        pay: pay.toString(),
        instrumentation: confinedInstrumentation,
        musicians: confinedMusicians,
      });

      setIsMusSelectOpen(() => {
        const obj: Partial<MusicianSelect> = {};

        instruments.map((inst: OneInstrument) => {
          const { name } = inst;
          obj[name as InstrumentName] = false;
        });
        return obj;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormSubmitTrue();
    const { name, startTime, endTime, venue, musicians, instrumentation, pay } =
      form;

    const validateOrError = validate(form);

    if (isValidationErrorLike(validateOrError)) {
      const messages = getZodErrMsg(validateOrError, gigFormErrors);
      setErrorMessages(messages);

      toast.error(validateOrError.message);
    } else {
      // If there's an instrument without a musician, display toast and return

      if (instsWithoutMusician.length > 0) {
        const instsForToast = displayMusicianNames(instsWithoutMusician);
        toast.error(`Musician needs to be added at ${instsForToast}`);
        return;
      }

      const instrumentNames = instrumentation.map((inst) => inst.name);

      if (gig) {
        const updatedMusicians = musicians.map((mus) => {
          return {
            name: mus.name,
            instrument: { name: mus.instrument.name, id: mus.instrument.id },
            id: mus.id,
          };
        });

        updateGig({
          id: gig.id,
          name,
          startTime,
          endTime,
          pay: Number(pay),
          venueId: venue?.id ?? "",
          musicians: updatedMusicians,
          instrumentation,
        });
      } else {
        const createMusicians = musicians.map((mus) => {
          return {
            name: mus.name,
            instrument: mus.instrument.name,
            id: mus.id,
          };
        });
        createGig({
          name,
          startTime,
          endTime,
          pay: Number(pay),
          venueId: venue?.id ?? "",
          musicians: createMusicians,
          instrumentation: instrumentNames,
        });
      }
    }
  };

  const deleteInst = (inst: GigFormInstrument) => {
    const { instrumentation, musicians } = form;
    const filteredMusicians = musicians.filter(
      (mus) => mus.instrument.name !== inst.name,
    );
    const filteredInsts = instrumentation.filter(
      (instrument) => instrument.name !== inst.name,
    );

    setForm({
      ...form,
      instrumentation: filteredInsts,
      musicians: filteredMusicians,
    });
  };

  const deleteMusician = (musician: GigFormMusician) => {
    updateValue("musicians", musician, "delete");
  };

  const payValidate = (num: number) => {
    const schema = z.number().nonnegative();
    const parsedVal = schema.safeParse(num);
    return parsedVal.success;
  };


  return (
    <>
      <form
        className="mt-8 flex w-full justify-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex min-h-screen w-full flex-col items-center gap-8 mb-8">
          <FormInput
            label="Name"
            value={form.name}
            placeholder="Gig 1"
            action={(e) => handleChange(e)}
            name="name"
            condition={displayFormError(
              "name",
              form.name,
              z.string().min(3),
              gigFormErrors.name,
            )}
            type="text"
            errors={errorMessages.name ?? []}
            isFormSubmitted={isFormSubmitted}
          />
          <DateSelector
            startTime={form.startTime}
            endTime={form.endTime}
            changeDate={changeValue}
            isFormSubmitted={isFormSubmitted}
          />
          <FormInput
            label="Pay"
            value={form.pay}
            type="number"
            name="pay"
            placeholder="400"
            action={(e) => handleChange(e)}
            condition={displayFormError(
              "pay",
              form.pay,
              z.string().refine((val) => {
                const num = parseInt(val);
                return payValidate(num);
              }),
              gigFormErrors.pay,
            )}
            errors={errorMessages.pay ?? []}
            isFormSubmitted={isFormSubmitted}
          />

          <InstrumentSelector
            allInstruments={instruments}
            deleteInst={deleteInst}
            addInst={addInstrument}
            errorMessages={errorMessages}
            isFormSubmitted={isFormSubmitted}
          />
          <MusicianSelector
            toggleInstSelect={setIsMusSelectOpen}
            isSelectorOpen={isMusSelectOpen}
            updateMusicians={updateValue}
            currentMusicians={form.musicians}
            instrumentation={form.instrumentation}
            deleteInst={deleteInst}
            deleteMusician={deleteMusician}
          />
          <VenueSelector
            setVenue={changeValue}
            venue={form?.venue ? form.venue : null}
          />
          <div className="flex justify-center sm:hidden">
            <MusicianDisplay
              musicians={form.musicians}
              deleteMusician={deleteMusician}
              instsWithoutMusician={instsWithoutMusician}
              deleteInst={deleteInst}
            />
          </div>

          <BaseButton as="button" type="submit">
            Submit
          </BaseButton>
        </div>
        <div className="hidden sm:flex sm:w-full sm:justify-center">
          {" "}
          <MusicianDisplay
            musicians={form.musicians}
            deleteMusician={deleteMusician}
            instsWithoutMusician={instsWithoutMusician}
            deleteInst={deleteInst}
          />
        </div>
      </form>
    </>
  );
};

export default GigForm;
