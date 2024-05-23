import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { type ZodType, z } from "zod";
import { fromError, type ValidationError } from "zod-validation-error";

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
  validate: (inputs: unknown) => Form | ValidationError | undefined;
  errorMessages: Partial<Record<keyof Form, string[]>>;
  setErrorMessages: Dispatch<
    SetStateAction<Partial<Record<keyof Form, string[]>>>
  >;
  displayFormError: (key: keyof Form, value: string | number, schema: z.ZodTypeAny, errorMessage: string) => boolean
};

const useForm = <Form extends object>(
  defaultValues: Form,
  validationSchema: ZodType<Form>,
): UseFormProps<Form> => {
  const [form, setForm] = useState<Form>(defaultValues);
  const [errorMessages, setErrorMessages] = useState<
    Partial<Record<keyof Form, string[]>>
  >({});

  const validate = (inputs: unknown) => {
    try {
      const isValidData = validationSchema.parse(inputs);

      return isValidData;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const validationErr = fromError(e);
        return validationErr;
      } 
    }
  };

  const displayFormError = (
    key: keyof Form,
    value: string | number,
    schema: z.ZodTypeAny,
    errorMessage: string
  ) => {

    const parsedVal = schema.safeParse(value);
    const doesPropertyExist = errorMessages.hasOwnProperty(key);

    if (parsedVal.success) {
      if (doesPropertyExist) {
        setErrorMessages((err) => {
          const filteredErrs = err;
          delete filteredErrs[key];
          return {
            ...filteredErrs,
          };
        });
      }
    } else {
      if (!doesPropertyExist) {
        setErrorMessages((err) => {
          const updatedErrs = err;
          updatedErrs[key] = [errorMessage];
          return updatedErrs;
        });
      }
    }

    return parsedVal.success;
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
    setErrorMessages,
    displayFormError
  };
};

export default useForm;
