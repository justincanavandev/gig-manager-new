import type { ChangeEvent } from "react";
import type { ComponentPropsWithRef } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

interface FormInputProps extends ComponentPropsWithRef<"input"> {
  action: (e: ChangeEvent<HTMLInputElement>) => void;
  innerClass?: string;
  outerClass?: string;
  label: string;
  condition?: boolean;
  errors: string[];
}

const FormInput = ({ ...props }: FormInputProps) => {
  const {
    outerClass,
    innerClass,
    name,
    value,
    placeholder,
    action,
    label,
    condition,
    errors,
    type,
  } = props;


  const displayIcon = () => {
    if (typeof value === "string") {
      if (value.length > 0) {
        if (condition) {
          return (
            <CheckIcon className="absolute right-0.5 top-[1.35rem] h-5 w-5 text-green-500" />
          );
        } else {
          return (
            <XMarkIcon className="absolute right-0.5 top-[1.35rem] h-5 w-5 text-red-500" />
          );
        }
      }
    } 
  };

  return (
    <>
      <div className="flex relative w-[14rem] flex-col justify-center rounded-md bg-dark-purple px-2 pb-2 pt-1.5 shadow-md ">
        <label
          className={`${outerClass ?? ""} relative flex flex-col text-[.7rem] uppercase`}
        >
          <span className="pb-0.5 pl-1">{label}</span>
          <input
            className={`w-[13rem] rounded-[4px] border pl-1 text-[1rem] text-black focus-visible:outline-none  ${innerClass ?? ""}`}
            onChange={action}
            name={name}
            value={value}
            placeholder={placeholder}
            type={type}
          ></input>
          {displayIcon()}
        </label>

        <div className="absolute bottom-[-1.5rem]">
        {typeof value === "string" &&
        value.length > 0 &&
        errors?.map((e) => (
          <span className="text-[.7rem]" key={`inputErrorMsg-${e}`}>
            {e}
          </span>
        ))}
        </div>
      </div>


    </>
  );
};

export default FormInput;
