import type { ChangeEvent } from "react";
import type { ComponentPropsWithRef } from "react";

interface FormInputProps extends ComponentPropsWithRef<"input"> {
  action: (e: ChangeEvent<HTMLInputElement>) => void;
  innerClass?: string;
  outerClass?: string;
  label: string;
  condition: boolean;
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

  const styling = () => {
    if (typeof value === "string") {
      if (value.length > 0) {
        if (condition) {
          return "border-green-500";
        } else {
          return "border-red-500";
        }
      }
    } else {
      return "border-black";
    }
  };

  return (
    <>
      <label className={`${outerClass ?? ""} flex flex-col`}>
        {label}
        <input
          className={`w-56 border ${styling()}  ${innerClass ?? ""}`}
          onChange={action}
          name={name}
          value={value}
          placeholder={placeholder}
          type={type}
        ></input>
      </label>
      {errors?.map((e) => <span key={`inputErrorMsg-${e}`}>{e}</span>)}
    </>
  );
};

export default FormInput;
