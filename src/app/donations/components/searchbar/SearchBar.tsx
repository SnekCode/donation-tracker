"use client";
import { ModalContext } from "@/app/context/modal/ModalProvider";
import { useProvider } from "@/app/context/useProvider";
import { Dispatch, createContext, useState } from "react";
import Select from "react-select";


interface ModalFormContextType {
  handleModal: () => void;
  valueFromSearchBar: string;
  handleModalSubmit: (partialEvent: {label: string, value: string}) => void
}

export const ModalFormContext = createContext<ModalFormContextType | undefined>(
  undefined
);

export interface SelectOption {
  value: string;
  label: string;
}

interface SearchBarProps {
  options: SelectOption[];
  name: string;
  label: string;
  Form: React.FC;
  isInValid?: boolean;
  onFocus?: () => void;
}

const SearchBar = ({ options, name, label, Form, onFocus, isInValid=false }: SearchBarProps) => {

  const { setModalContent, setShowModal, handleModal } = useProvider(ModalContext);
  const { formData, setFormData } = useProvider(FormContext);

  const [valueFromSearchBar, setValueFromSearchBar] = useState("");

  const handleModalSubmit = (partialEvent: {label: string, value: string}) => {
    setFormData({ name, ...partialEvent });
  }

  const modalContent: React.FC = () => (
    <ModalFormContext.Provider value={{ handleModalSubmit, handleModal, valueFromSearchBar }}>
      <Form />
    </ModalFormContext.Provider>
  );

  const toggleForm = () => {
    setShowModal(true);
    setModalContent(modalContent);
  };
  
  return (
    <div>
      <Select
        onInputChange={(selectedOption) =>
          setValueFromSearchBar(selectedOption)
        }
        onChange={(selectedOption) => setFormData({ label: selectedOption?.label || "", value: selectedOption?.value || "", name})}
        value={{value: formData[name].value, label: formData[name].label}}
        name={name}
        className={`text-slate-700 ${isInValid && !formData[name].value ? "animate-pulse border-4 border-red-700" : ""}`}
        options={options}
        isSearchable={true}
        onFocus={onFocus}
        onMenuOpen={onFocus}
        noOptionsMessage={() => (
          <button className="text-slate-700" onClick={toggleForm}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                toggleForm();
              }
            }}

          >
            No options found click to create new {label}
          </button>
        )}
      />
      <label htmlFor={name} className="pb-6">
        {label}
      </label>
    </div>
  );
};



export default SearchBar;

// easy to use form components exported here
import DonorForm from "./forms/DonorForrm";
import TransactionTypeForm from "./forms/TransactionTypeForm";
import { FormContext } from "@/app/context/donation/FormProvider";
// import ReasonForm from "./forms/ReasonForm";
export { DonorForm, TransactionTypeForm } 