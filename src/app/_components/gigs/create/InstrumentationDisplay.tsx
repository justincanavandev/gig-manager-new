import type { GigFormInstrument } from "~/server/types/gigTypes";

interface InstDisplayProps {
  instrumentation: GigFormInstrument[];
  deleteInst: (inst: GigFormInstrument) => void;
  instsWithoutMusician: GigFormInstrument[];
}

const InstrumentationDisplay = ({
  instrumentation,
  deleteInst,
  instsWithoutMusician,
}: InstDisplayProps) => {

  const instWithoutMusNames = instsWithoutMusician.map((inst) => inst.name);

  const doesInstHaveMusician = (inst: GigFormInstrument) =>
    instWithoutMusNames.includes(inst.name);

  return (
    <>
      {instrumentation.length > 0 && (
        <div className="flex w-[14rem] flex-col rounded-md bg-dark-purple px-2 pb-2 pt-1.5 shadow-lg">
          <h3 className="pb-0.5 pl-1 text-[.7rem] uppercase">
            Instrumentation
          </h3>
          {instrumentation?.map((inst, index) => (
            <div
              className={`flex justify-between gap-4 bg-white text-black ${index === 0 && "rounded-t-[3px]"} ${index + 1 === instrumentation.length ? "rounded-b-[3px]" : "border-b"}  px-1 text-[.9rem] shadow-lg`}
              key={`instSelector, ${inst.name}`}
            >
              <div className="flex flex-col">
                <span
                  className={`${doesInstHaveMusician(inst) && "text-red-500"}`}
                >
                  {inst.name}
                </span>
                {/* {doesInstHaveMusician(inst) && (
                  <span className="text-red-500">Add {inst.name}</span>
                )} */}
              </div>
              <span onClick={() => deleteInst(inst)}>x</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default InstrumentationDisplay;
