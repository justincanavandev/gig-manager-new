import type { GetAllInstruments } from "~/server/types/instrumentTypes";
import BaseCombobox from "../../base/BaseCombobox";
import type { GigFormInstrument } from "~/server/types/gigTypes";
import {
  confineInstData,
  instToString,
} from "~/lib/features/instrument/instrumentSlice";

type InstrumentSelectorProps = {
  allInstruments: GetAllInstruments;
  deleteInst: (inst: GigFormInstrument) => void;
  addInst: (inst: GigFormInstrument) => void;
};

const InstrumentSelector = ({
  allInstruments,
  deleteInst,
  addInst,
  
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
      />
    </div>
  );
};

export default InstrumentSelector;
