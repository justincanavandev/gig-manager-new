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
  value?: T | null
  dataToString: (data: T) => string;
  disabledData?: Array<T>
  action: (data: T) => void;
  action2:(data: T) => void;
  label: string;
  errors?: string[]
  placeholder: string
  isFormSubmitted?: boolean
};

const BaseCombobox = <T extends object>({
  data,
  dataToString,
  action,
  action2,
  disabledData,
  label,
  value,
  errors,
  isFormSubmitted,
  placeholder
}: BaseComboboxProps<T>) => {
  const [query, setQuery] = useState<string>("");

  const sortedData = disabledData ? [...data, ...disabledData] : [...data]

  const filteredData = sortedData.filter((datum) => {
    const datumString = dataToString(datum);
    return datumString.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <Combobox
      as="div"
      className="relative bg-dark-purple flex flex-col w-[14rem] rounded-md px-2 pb-2 pt-1.5 shadow-lg"
      value={value ? value : null}
      // value={query}
      onChange={action}
      nullable
    >
      <Combobox.Label className="text-[.7rem] pb-0.5 pl-1 uppercase">{label}</Combobox.Label>
      <Combobox.Input
        placeholder={placeholder}
        className="border pl-1 text-black focus-visible:outline-none w-[13rem] rounded-[4px]"
        onChange={(e) => setQuery(e.target.value)}
        displayValue={(val: T)=> val ? dataToString(val) : ""}
      />
      <Combobox.Button className="absolute text-gray-400 right-[9px] top-[1.72rem]">
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
        <Combobox.Options className="border bg-white text-black rounded-[4px] border-black" as="div" static>
          {filteredData.map((datum, index) => (
            <Combobox.Option
              key={`combobox-${index}`}
              value={datum}
              disabled={disabledData ? disabledData.includes(datum) : false}
              className="ui-active:bg-blue-500 ui-active:text-white ui-disabled:text-black ui-disabled:bg-slate-200 flex list-none justify-between gap-2"
            >
              {dataToString(datum)}
              {disabledData?.includes(datum) && (
                <div className="flex gap-1.5 pr-1">
                  <CheckIcon className="h-5 w-5" />
                  <XCircleIcon onClick={()=> action2(datum)} className="h-5 w-5" />
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Transition>
      <div className="absolute bottom-[-1.5rem]">
          {
           isFormSubmitted &&
            errors?.map((e) => (
              <span className="text-[.7rem]" key={`inputErrorMsg-${e}`}>
                {e}
              </span>
            ))}
        </div>
    </Combobox>
  );
};

export default BaseCombobox;
