import type { GigFormMusician } from "~/server/types/gigTypes";

interface InstDisplayProps {
  musicians: GigFormMusician[];
  deleteMusician: (musician: GigFormMusician) => void;
}

const MusicianDisplay = ({ musicians, deleteMusician }: InstDisplayProps) => {
  return (
    <>
      {musicians.length > 0 && (
        <div className="flex h-fit w-[90%] max-w-[400px] flex-col rounded-md bg-dark-purple px-2 pb-2 pt-1.5 shadow-lg">
          <div className="flex ">
            <div className="relative w-1/2 pb-0.5 pl-1 text-[.7rem] uppercase">
              Instrument
              <h3 className="absolute top-0 right-[-50px] pb-0.5 pl-1 ">
                Musician
              </h3>
            </div>
          </div>
          {musicians.map((mus, index) => (
            <div
              className={`flex gap-4 bg-white text-black ${index === 0 && "rounded-t-[3px]"} ${index + 1 === musicians.length ? "rounded-b-[3px]" : "border-b"} justify-between rounded-[2px] px-1 text-[.9rem] shadow-lg`}
              key={`currentMusicians-${mus.id}`}
            >
              <div className="flex w-full justify-evenly gap-4">
                <span className="w-full">{mus.instrument.name}</span>
                <span className="w-full truncate">{mus.name}</span>
              </div>
              <span onClick={() => deleteMusician(mus)}>x</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MusicianDisplay;
