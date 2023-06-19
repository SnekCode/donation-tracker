'use client'
import { useToast } from '@/app/context/toast/ToastProvider';
import React from 'react'
import SearchBar, {DonorForm, SelectOption, TransactionTypeForm} from './searchbar/SearchBar';
import { redirect } from 'next/navigation';
import { CreateDonationReturnType } from '@/app/api/donation/route';
import { useTheme } from '@/app/context/theme/ThemeProvider';

interface DonationFormProps {
    donorOptions: SelectOption[];
    transactionTypeOptions: SelectOption[];
    reasonOptions: SelectOption[];
}

const DonationForm: React.FC<DonationFormProps> = ({donorOptions, transactionTypeOptions, reasonOptions}) => {
    const {showToast} = useToast();
    const {altText, bg, border, hover,inputfieldbg,text} = useTheme()


    const createDonation = async (formData: FormData) => {
        const data = Object.fromEntries(formData.entries());
        const res = await fetch('/api/donation', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        const resData: CreateDonationReturnType = await res.json();
        showToast(`$${resData.amount} ${resData.transactionType.name} ${resData.reason.name} Added`, '5s');
        redirect('/new')
    }

  return (
    <form
          action={createDonation}
          method="post"
          className="w-auto flex flex-col px-4 py-4 container"
        >
          <input className="text-slate-800" type="number" name="amount" />
          <label htmlFor="amount" className="pb-6">
            Donation Amount
          </label>
          <SearchBar
            name="donorId"
            options={donorOptions}
            label="Donor"
            Form={DonorForm}
          />
          <SearchBar
            name="transactionTypeId"
            options={transactionTypeOptions}
            label="Transaction Type"
            Form={TransactionTypeForm}
          />
          <SearchBar
            name="reasonId"
            options={reasonOptions}
            label="Reason"
            Form={DonorForm}
          />
          <button className={`${text} ${border} ${hover} mt-5 w-min px-5 py-3`}>Add</button>
        </form>
  )
}

export default DonationForm