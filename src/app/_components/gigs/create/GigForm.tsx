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
import {
  confineInstData,
  useInstruments,
  instToString,
} from "~/lib/features/instrument/instrumentSlice";
import BaseCombobox from "../../base/BaseCombobox";
import type {
  InstrumentName,
  OneInstrument,
} from "~/server/types/instrumentTypes";
import type { MusicianSelect } from "~/server/types/instrumentTypes";
import { isInstrumentValid } from "~/server/utils/typeGuards";
import BaseButton from "../../base/BaseButton";

type GigFormProps = {
  gig?: GigById;
};

const GigForm = ({ gig }: GigFormProps) => {
  const { form, setForm, handleChange, updateValue, changeValue } =
    useForm<GigForm>(defaultGigForm);

  const instruments = useInstruments();

  const confinedInsts = instruments.map((inst) => confineInstData(inst));

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
      const { name, startTime, endTime, instrumentation, musicians, venue } =
        gig;

      const confinedMusicians = musicians.map((mus) => {
        return {
          instrument: {
            name: mus.instrument.name,
            id: mus.instrument.id,
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
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
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
  }, [gig, setForm, instruments]);

  const { mutate: createGig } = api.gig.create.useMutation();
  const { mutate: updateGig } = api.gig.update.useMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, startTime, endTime, venue, musicians, instrumentation } =
      form;

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
        startTime: new Date(startTime),
        endTime: new Date(endTime),
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
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        venueId: venue?.id ?? "",
        musicians: createMusicians,
        instrumentation: instrumentNames,
      });
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

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col gap-4">
          <FormInput
            label="Name"
            value={form.name}
            placeholder="John Smith"
            action={(e) => handleChange(e)}
            name="name"
          />
          <DateSelector
            startTime={form.startTime}
            endTime={form.endTime}
            changeDate={changeValue}
          />

          <BaseCombobox
            data={confinedInsts}
            dataToString={instToString}
            label="Instrumentation"
            action={addInstrument}
            action2={deleteInst}
          />

          <MusicianSelector
            toggleInstSelect={setIsMusSelectOpen}
            isSelectorOpen={isMusSelectOpen}
            updateMusicians={updateValue}
            currentMusicians={form.musicians}
            instrumentation={form.instrumentation}
          />
          <VenueSelector
            setVenue={changeValue}
            venue={form?.venue ? form.venue : null}
          />

    
          <BaseButton as="button" type="submit">Submit</BaseButton>
        </div>
      </form>
    </>
  );
};

export default GigForm;
