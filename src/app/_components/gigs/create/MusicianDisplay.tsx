import type {
  GigFormMusician,
  GigFormInstrument,
} from "~/server/types/gigTypes";

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
  type RowProps = {
    name: string;
    instName: string;
    condition1: boolean;
    condition2: boolean;
    action: () => void;
  };

  const Row = ({
    name,
    instName,
    condition1,
    condition2,
    action,
  }: RowProps) => {
    return (
      <div
        className={`flex gap-4 bg-white text-black ${condition1 && "rounded-t-[3px]"} ${condition2 ? "rounded-b-[3px]" : "border-b"} justify-between rounded-[2px] px-1 text-[.9rem] shadow-lg`}
      >
        <div className="flex w-full justify-evenly gap-4">
          <span className="w-full">{instName}</span>
          <span
            className={`w-full truncate ${name === "Please Select!" && "text-red-500"}`}
          >
            {name}
          </span>
        </div>
        <span onClick={() => action()}>x</span>
      </div>
    );
  };

  return (
    <>
      {(musicians.length > 0 || instsWithoutMusician.length > 0) && (
        <div className="flex h-fit w-[300px] max-w-[400px] flex-col rounded-md bg-dark-purple px-2 pb-2 pt-1.5 shadow-lg sm:w-[90%]">
          <div className="flex">
            <div className="relative w-1/2 pb-0.5 pl-1 text-[.7rem] uppercase">
              Instrument
              <h3 className="absolute right-[-50px] top-0 pb-0.5 pl-1 ">
                Musician
              </h3>
            </div>
          </div>
          {musicians.map((mus, index) => (
            <Row
              key={`currentMusicians-${mus.id}`}
              name={mus.name}
              instName={mus.instrument.name}
              condition1={index === 0}
              condition2={
                index + 1 === musicians.length &&
                instsWithoutMusician.length === 0
              }
              action={() => deleteMusician(mus)}
            />
          ))}
          {instsWithoutMusician.map((inst, index) => (
            <Row
              key={`instWithoutMus-${inst.id}`}
              name="Please Select!"
              instName={inst.name}
              condition1={index === 0 && musicians.length === 0}
              condition2={
                index + 1 === musicians.length &&
                instsWithoutMusician.length === 0
              }
              action={() => deleteInst(inst)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MusicianDisplay;
