"use client";

import { Combobox, Transition } from "@headlessui/react";
import { useState } from "react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

type BaseComboboxProps<T> = {
  data: Array<T>;
  dataToString: (data: T) => string;
  disabledData: Array<T>;
  action: (data: T) => void;
  action2:(data: T) => void;
  label: string;
};

const BaseCombobox = <T,>({
  data,
  dataToString,
  action,
  action2,
  disabledData,
  label,
}: BaseComboboxProps<T>) => {
  const [query, setQuery] = useState<string>("");

  const enabledData = data.filter((datum) => !disabledData.includes(datum));
  const sortedData = [...enabledData, ...disabledData];

  const filteredData = sortedData.filter((datum) => {
    const datumString = dataToString(datum);
    return datumString.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <Combobox
      as="div"
      className="relative flex w-fit flex-col "
      onChange={action}
      nullable
    >
      <Combobox.Label>{label}</Combobox.Label>
      <Combobox.Input
        className="border border-black"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Combobox.Button className="absolute right-[2px] top-[1.72rem]">
        <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
      </Combobox.Button>
      <Transition
        enter="transition ease-in-out duration-150"
        enterFrom="scale-50 "
        enterTo="scale-100"
        leave="transition ease-in-out duration-150"
        leaveFrom="scale-100"
        leaveTo="scale-0"
        afterLeave={() => setQuery("")}
      >
        <Combobox.Options className="border border-black" as="div" static>
          {filteredData.map((datum, index) => (
            <Combobox.Option
              key={`combobox-${index}`}
              value={datum}
              disabled={disabledData.includes(datum)}
              className="ui-active:bg-blue-500 ui-active:text-white ui-disabled:text-black ui-disabled:bg-slate-200 flex list-none justify-between gap-2"
            >
              {dataToString(datum)}
              {disabledData.includes(datum) && (
                <div className="flex gap-1.5 pr-1">
                  <CheckIcon className="h-5 w-5" />
                  <XCircleIcon onClick={()=> action2(datum)} className="h-5 w-5" />
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};

export default BaseCombobox;
