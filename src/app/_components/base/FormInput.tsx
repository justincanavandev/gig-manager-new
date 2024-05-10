import type { ChangeEvent } from "react";
import type { ComponentPropsWithRef } from "react";

// type FormInputProps = {
//   action: (e: ChangeEvent<HTMLInputElement>) => void;
//   name: string;
//   value: string;
//   label: string
//   placeholder: string
//   innerClass?: string
//   outerClass?: string
// };

interface FormInputProps extends ComponentPropsWithRef<"input"> {
  action: (e: ChangeEvent<HTMLInputElement>) => void;
  innerClass?: string;
  outerClass?: string;
  label: string;
}

const FormInput = ({ ...props }: FormInputProps) => {
  return (
    <label className={`${props.outerClass} flex flex-col`}>
      {props.label}
      <input
        className={`w-56 border border-black ${props.innerClass}`}
        onChange={props.action}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
      ></input>
    </label>
  );
};

export default FormInput;
