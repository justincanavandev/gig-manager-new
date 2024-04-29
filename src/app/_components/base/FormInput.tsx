import type { ChangeEvent } from "react";

type FormInputProps = {
  action: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  label: string
  placeholder: string
  innerClass?: string
  outerClass?: string
};


const FormInput = ({ ...props }: FormInputProps) => {
  return (
    <label className={`${props.outerClass} flex flex-col` }>
        {props.label}
      <input
        className={`border border-black w-56 ${props.innerClass}`}
        onChange={props.action}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
      ></input>
    </label>
  );
};

export default FormInput;
