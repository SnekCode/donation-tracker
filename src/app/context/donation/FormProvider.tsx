"use client";
import { createContext } from "react";
import { ContextType } from "../ContextType";
import React from "react";

export type FormContextType = {
  formData: FormDataState;
  setFormData: React.Dispatch<FormDataEvent>;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

interface FormProviderProps extends ContextType {
  formFields: string[];
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

type FormDataState = {
  [key: string]: FormDataEvent;
};

type FormDataEvent = {
  name: string;
  value: string;
  label: string;
};

const formReducer = (state: FormDataState, event: FormDataEvent) => {
  return {
    ...state,
    [event.name]: {
      ...state[event.name],
      value: event.value,
      label: event.label
    },
  };
};

export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  formFields,
}) => {
  const [formData, setFormData] = React.useReducer(formReducer, 
    formFields.reduce((acc, field) => ({ ...acc, [field]: {value: "", label: "", name: ""} }), {}));

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ name: e.target.name, value: e.target.value, label: "" });

  return (
    <FormContext.Provider value={{ formData, setFormData, handleOnChange }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
