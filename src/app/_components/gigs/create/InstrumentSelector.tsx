import type { GetAllInstruments } from "~/server/types/instrumentTypes";
import BaseCombobox from "../../base/BaseCombobox";
import type { GigFormInstrument } from "~/server/types/gigTypes";
import {
  confineInstData,
  instToString,
} from "~/lib/features/instrument/instrumentSlice";
import type { GigForm } from "~/server/types/gigTypes";

type InstrumentSelectorProps = {
  allInstruments: GetAllInstruments;
  deleteInst: (inst: GigFormInstrument) => void;
  addInst: (inst: GigFormInstrument) => void;
  errorMessages: Partial<Record<keyof GigForm, string[]>>
  isFormSubmitted: boolean
};

const InstrumentSelector = ({
  allInstruments,
  deleteInst,
  addInst,
  errorMessages,
  isFormSubmitted
}: InstrumentSelectorProps) => {
  
  const confinedInsts = allInstruments.map((inst) => confineInstData(inst));


  return (
    <div>
      <BaseCombobox
        data={confinedInsts}
        dataToString={instToString}
        label="Instrumentation"
        action={addInst}
        action2={deleteInst}
        errors={errorMessages.instrumentation ?? []}
        isFormSubmitted={isFormSubmitted}
      />
    </div>
  );
};

export default InstrumentSelector;
