import { useState, type ChangeEvent } from "react";
import { type ZodType, z } from "zod";
import type { FieldErrors } from "../error/errorHelpers";

type UseFormProps<Form> = {
  form: Form;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  setForm: (state: Form) => void;
  updateValue: <Value>(
    key: keyof Form,
    value: Value,
    action: "add" | "delete",
  ) => void;
  changeValue: <Value>(key: keyof Form, value: Value) => void;
  validate: (inputs: unknown) => Form | undefined;
  errorMessages: FieldErrors;
};


const useForm = <Form extends object>(
  defaultValues: Form,
  validationSchema: ZodType<Form>,
): UseFormProps<Form> => {
  const [form, setForm] = useState<Form>(defaultValues);
  const [errorMessages, setErrorMessages] = useState<FieldErrors>({});

  const validate = (inputs: unknown) => {
    try {
      const isValidData = validationSchema.parse(inputs);

      return isValidData;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errors = e.flatten();
        setErrorMessages(errors.fieldErrors);
      }
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const changeValue = <Value>(key: keyof Form, value: Value) => {
    setForm((formData) => {
      return {
        ...formData,
        [key]: value,
      };
    });
  };

  const updateValue = <Value>(
    key: keyof Form,
    value: Value,
    action: "add" | "delete",
  ) => {
    setForm((formData) => {
      const arr = form[key];
      if (Array.isArray(arr)) {
        if (action === "add") {
          return {
            ...formData,
            [key]: [...arr, value],
          };
        }

        if (action === "delete") {
          const filteredData = arr.filter((d) => d !== value);
          return {
            ...formData,
            [key]: filteredData,
          };
        }
      }
      return formData;
    });
  };

  return {
    form,
    setForm,
    handleChange,
    updateValue,
    changeValue,
    validate,
    errorMessages,
  };
};

export default useForm;
