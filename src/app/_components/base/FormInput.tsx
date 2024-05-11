import type { ChangeEvent } from "react";
import type { ComponentPropsWithRef } from "react";

interface FormInputProps extends ComponentPropsWithRef<"input"> {
  action: (e: ChangeEvent<HTMLInputElement>) => void;
  innerClass?: string;
  outerClass?: string;
  label: string;
}

const FormInput = ({ ...props }: FormInputProps) => {
  const { outerClass, innerClass, name, value, placeholder, action, label } =
    props;

  return (
    <label className={`${outerClass ?? ""} flex flex-col`}>
      {label}
      <input
        className={`w-56 border border-black ${innerClass ?? ""}`}
        onChange={action}
        name={name}
        value={value}
        placeholder={placeholder}
      ></input>
    </label>
  );
};

export default FormInput;
