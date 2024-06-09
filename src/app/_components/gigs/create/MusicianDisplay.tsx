import type {
  GigFormMusician,
  GigFormInstrument,
} from "~/server/types/gigTypes";
import BaseRow from "../../base/BaseRow";

interface InstDisplayProps {
  musicians: GigFormMusician[];
  deleteMusician: (musician: GigFormMusician) => void;
  instsWithoutMusician: GigFormInstrument[];
  deleteInst: (inst: GigFormInstrument) => void;
}

const MusicianDisplay = ({
  musicians,
  deleteMusician,
  instsWithoutMusician,
  deleteInst,
}: InstDisplayProps) => {
  return (
    <>
      <div className="flex h-fit w-[300px] max-w-[400px] flex-col rounded-md bg-dark-purple px-2 pb-2 pt-1.5 shadow-lg sm:w-[90%]">
        <div className="flex">
          <div className="relative w-1/2 pb-0.5 pl-1 text-[.7rem] uppercase">
            Instrument
            <h3 className="absolute right-[-50px] top-0 pb-0.5 pl-1 ">
              Musician
            </h3>
          </div>
        </div>
        {(musicians.length > 0 || instsWithoutMusician.length > 0) && (
          <>
            {musicians.map((mus, index) => (
              <BaseRow
                key={`currentMusicians-${mus.id}`}
                optionalName={mus.name}
                requiredName={mus.instrument.name}
                condition1={index === 0}
                condition2={
                  index + 1 === musicians.length &&
                  instsWithoutMusician.length === 0
                }
                action={() => deleteMusician(mus)}
              />
            ))} 
            {instsWithoutMusician.map((inst, index) => (
              <BaseRow
                key={`instWithoutMus-${inst.id}`}
                optionalName="Please Select!"
                requiredName={inst.name}
                condition1={index === 0 && musicians.length === 0}
                condition2={
                  index + 1 === musicians.length &&
                  instsWithoutMusician.length === 0
                }
                action={() => deleteInst(inst)}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default MusicianDisplay;
