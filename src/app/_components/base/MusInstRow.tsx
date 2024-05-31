  type RowProps = {
    name: string;
    instName: string;
    condition1: boolean;
    condition2: boolean;
    action?: () => void;
  };

const MusInstRow = ({
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
        {action &&
        <span onClick={() => action()}>x</span>
  }
      </div>
    );
  };

  export default MusInstRow
