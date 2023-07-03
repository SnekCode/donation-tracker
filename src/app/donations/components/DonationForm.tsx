"use client";
import { useToast } from "@/app/context/toast/ToastProvider";
import React from "react";
import SearchBar, {
  DonorForm,
  SelectOption,
  TransactionTypeForm,
} from "./searchbar/SearchBar";
import { redirect } from "next/navigation";
import { CreateDonationReturnType } from "@/app/api/donation/route";
import { useTheme } from "@/app/context/theme/ThemeProvider";
import {
  dollarAmountAllowedKeys,
  operatorAllowedKeys,
} from "@/app/consts/keys";
import { useProvider } from "@/app/context/useProvider";
import { FormContext } from "@/app/context/form/FormProvider";

interface DonationFormProps {
  donorOptions: SelectOption[];
  transactionTypeOptions: SelectOption[];
  reasonOptions: SelectOption[];
}

const numbersOnly = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const key = e.code.toLowerCase();
  console.log(key);

  if (
    operatorAllowedKeys.includes(key) ||
    dollarAmountAllowedKeys.includes(key)
  ) {
    return;
  }

  (e.target as HTMLInputElement).setCustomValidity("");
  e.preventDefault();
};

const validationError = (
  e: React.FormEvent<HTMLInputElement>,
  message: string
) => {
  (e.target as HTMLInputElement).setCustomValidity(message);
};


const DonationForm: React.FC<DonationFormProps> = ({
  donorOptions,
  transactionTypeOptions,
  reasonOptions,
}) => {
  const { showToast } = useToast();
  const [submit, setSubmit] = React.useState(false);
  const [isInValid, setIsInValid] = React.useState(false);
  const {formData, handleOnChange} = useProvider(FormContext)
  const { bg, border, hover, text } = useTheme();

  const createDonation = async (formData: FormData) => {
    
    const data = Object.fromEntries(formData.entries());

    if (
      !data.amount ||
      !data.donorId ||
      !data.transactionTypeId ||
      !data.reasonId
    ) {
      
      setIsInValid(true);
      return;
    }

    const res = await fetch("/api/donation", {
      method: "POST",
      body: JSON.stringify(data),
      next: { tags: ["donations"], revalidate: 10 },
    });

    const resData: CreateDonationReturnType = await res.json();
    showToast(
      `$${resData.amount} ${resData.transactionType.name} ${resData.reason.name} Added`,
      "5s"
    );

    setSubmit(true);
  };

  if (submit) {
    redirect("/donations");
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createDonation(new FormData(e.currentTarget));
      }}
      
      className="w-auto flex flex-col px-4 py-4 container"
    >
      <input
        autoFocus
        placeholder="$ Donation Amount"
        onKeyDown={(e) => {
          setIsInValid(false);
          numbersOnly(e)
        }}
        // onInvalid={(e) => validationError(e, "Please enter a Dollar Amount in the format of 0.00")}
        className={`text-slate-800 pl-2 `}
        // pattern="\d\d?\.?\d?\d?"
        name="amount"
        autoComplete="off"
        onFocus={() => setIsInValid(false)}
        onChange={handleOnChange}
        value={formData.amount.value}
      />
      <label htmlFor="amount" className="pb-6">
        Donation Amount
      </label>
      <SearchBar
        name="donorId"
        options={donorOptions}
        label="Donor"
        Form={DonorForm}
        isInValid={isInValid}
        onFocus={() => setIsInValid(false)}
      />
      <SearchBar
        name="transactionTypeId"
        options={transactionTypeOptions}
        label="Transaction Type"
        Form={TransactionTypeForm}
        isInValid={isInValid}
        onFocus={() => setIsInValid(false)}
      />
      <SearchBar
        name="reasonId"
        options={reasonOptions}
        label="Reason"
        Form={DonorForm}
        isInValid={isInValid}
        onFocus={() => setIsInValid(false)}
      />
      <button
        type="submit"
        className={`${text} ${border} ${hover} mt-5 w-min px-5 py-3`}
      >
        Add
      </button>
    </form>
  );
};

export default DonationForm;
