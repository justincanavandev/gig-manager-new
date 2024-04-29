import { useState, type ChangeEvent } from "react";

type UseFormProps<T> = {
  form: T;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  setForm: (state: T) => void;
  updateValue: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    value: string | number | null,
    arr: (string | number)[],
  ) => void;
};

const useForm = <T extends object>(defaultValues: T): UseFormProps<T> => {
  const [form, setForm] = useState<T>(defaultValues);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const updateValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    value: string | number | null,
    arr: (string | number)[],
  ) => {
    const { name } = e.target;

    setForm((formData) => ({
      ...formData,
      [name]: value ? [...arr, value] : [...arr],
    }));
  };


  return {
    form,
    setForm,
    handleChange,
    updateValue,
  };
};

export default useForm;
