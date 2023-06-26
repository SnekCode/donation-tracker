'use client'
import { useToast } from '@/app/context/toast/ToastProvider';
import React from 'react'
import SearchBar, {DonorForm, SelectOption, TransactionTypeForm} from './searchbar/SearchBar';
import { useRouter, redirect } from 'next/navigation';
import { CreateDonationReturnType } from '@/app/api/donation/route';
import { useTheme } from '@/app/context/theme/ThemeProvider';
import { RedirectType } from 'next/dist/client/components/redirect';

interface DonationFormProps {
    donorOptions: SelectOption[];
    transactionTypeOptions: SelectOption[];
    reasonOptions: SelectOption[];
}

const DonationForm: React.FC<DonationFormProps> = ({donorOptions, transactionTypeOptions, reasonOptions}) => {
    const {showToast} = useToast();
    const [submit, setSubmit] = React.useState(false);
    const {refresh} = useRouter();
    const {altText, bg, border, hover,inputfieldbg,text} = useTheme()


    const createDonation = async (formData: FormData) => {
        const data = Object.fromEntries(formData.entries());
        const res = await fetch('/api/donation', {
            method: 'POST',
            body: JSON.stringify(data),
            next: {tags: ['donations'], revalidate: 10}
        });
        const resData: CreateDonationReturnType = await res.json();
        showToast(`$${resData.amount} ${resData.transactionType.name} ${resData.reason.name} Added`, '5s');
        
        setSubmit(true);
    }

    if(submit){
      redirect('/donations')
    }

  return (
    <form
          onSubmit={(e) => {
            e.preventDefault();
            createDonation(new FormData(e.currentTarget));
          }}
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
          <button type='submit' className={`${text} ${border} ${hover} mt-5 w-min px-5 py-3`}>Add</button>
        </form>
  )
}

export default DonationForm