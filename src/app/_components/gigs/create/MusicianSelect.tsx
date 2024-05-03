import type {
  GigFormMusician,
  GigFormInstrument,
} from "~/server/types/gigTypes";
import { useBoolean } from "usehooks-ts";
import BaseCombobox from "../../base/BaseCombobox";
import type { GigForm } from "~/server/types/gigTypes";

type MusicianSelectorProps = {
  currentMusicians: GigFormMusician[];
    instrumentation: GigFormInstrument[];
  updateMusicians: <Value>(
    key: keyof GigForm,
    addedValue: Value,
    action: "add" | "delete",
  ) => void;
  instrument: GigFormInstrument;
  //   children: React.ReactNode;
};

const MusicianSelect = ({
  instrument,
  currentMusicians,
  updateMusicians,
  // instrumentation
  //   children,
}: MusicianSelectorProps) => {

  const doesInstrumentHaveMusician = (inst: string) => {
    const musicians = currentMusicians.map((mus) => mus);
    const result = musicians.find((mus) => mus?.instrument?.name === inst);
    console.log("result", !!result);

    return !!result;
  };

  const {
    value: isSelectOpen,
    setTrue: openSelect,
    // setFalse: closeSelect,
  } = useBoolean(!doesInstrumentHaveMusician(instrument.name));

  console.log("isSelect", isSelectOpen);

  const handleAddMusician = (musician: GigFormMusician) => {
    /** @todo Add "addMusician" functionality. This will deal with duplicate instruments being added, Confirmation Modal, etc */

    updateMusicians("musicians", musician, "add");
    openSelect()
  };

  const deleteMusician = (musician: GigFormMusician) => {
    updateMusicians("musicians", musician, "delete");
  };
  const musicianToString = (musician: GigFormMusician) => musician.name;

  return (
    <>
      {isSelectOpen && (
        <div key={`gigForm, ${instrument.id}, ${instrument.name}`}>
          <BaseCombobox
            data={
              instrument.musicians
                ? instrument.musicians
                    .filter(
                      (mus) =>
                        !currentMusicians.map((m) => m.id).includes(mus.id),
                    )
                    .map((mus) => {
                      return {
                        ...mus,
                        instrument: {
                          name: instrument.name,
                          id: instrument.id,
                        },
                      };
                    })
                : []
            }
            disabledData={currentMusicians.filter(
              (mus) => mus.instrument.name === instrument.name,
            )}
            dataToString={musicianToString}
            label={`Add ${instrument.name}`}
            action={handleAddMusician}
            action2={deleteMusician}
          />
        </div>
       )} 
    </>
  );
};

export default MusicianSelect;
