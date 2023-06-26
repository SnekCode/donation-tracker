"use client";
import { ModalContext } from "@/app/context/modal/ModalProvider";
import { useProvider } from "@/app/context/useProvider";
import { createContext, useState } from "react";
import Select from "react-select";


interface FormContextType {
  toggleForm: () => void;
  valueFromSearchBar: string;
  setSelectedOption: (data: SelectOption) => void;
}

export const FormContext = createContext<FormContextType | undefined>(
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
}

const SearchBar = ({ options, name, label, Form }: SearchBarProps) => {
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );
  const { setModalContent, setShowModal } = useProvider(ModalContext);

  const [valueFromSearchBar, setValueFromSearchBar] = useState("");

  const modalContent: React.FC = () => (
    <FormContext.Provider value={{setSelectedOption, toggleForm, valueFromSearchBar}}>
      <Form/>
    </FormContext.Provider>
  );

  const toggleForm = () => {
    setShowModal(true);
    setModalContent(modalContent);
  };

  return (
    <div onSubmit={() => setSelectedOption(null)}>
      <Select
        onInputChange={(selectedOption) =>
          setValueFromSearchBar(selectedOption)
        }
        onChange={(selectedOption) => setSelectedOption(selectedOption)}
        value={selectedOption}
        name={name}
        className="text-slate-700"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toggleForm();
          }
        }}
        options={options}
        isSearchable={true}
        noOptionsMessage={() => (
          <button className="text-slate-700" onClick={toggleForm}>
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
// import ReasonForm from "./forms/ReasonForm";
export {DonorForm, TransactionTypeForm} 