"use client"
import { useEffect, useRef, useState } from "react";
import { FormContext } from "../SearchBar";
import { useProvider } from "@/app/context/useProvider";
import { useTheme } from "@/app/context/theme/ThemeProvider";

interface PayeeFormState {
    name: string;
    email: string;
}

const DonorForm = () => {
    const {valueFromSearchBar, toggleForm, setSelectedOption} = useProvider(FormContext);
    const {altText, bg, inputfieldbg, border, hover, text} = useTheme()

    const [payee, setPayee] = useState<PayeeFormState>({
        name: valueFromSearchBar,
        email: '',
    });

    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, []);

    const handleSubmit = async () => {
        console.log(payee);
        
        const res = await fetch('/api/donor', {
            method: 'POST',
            body: JSON.stringify({
                name: payee.name,
                email: payee.email,
            }),
        });
        // if successful, close form
        const data = await res.json();
        setSelectedOption({value: data.id, label: data.name});
        toggleForm();
    }

    return (
        <div className="px-16 py-8 w-full bg-slate-700  flex flex-col">
            <input
                className={`${inputfieldbg} ${text} pr-5`}
                type='text'
                name='name'
                id='name'
                value={payee.name}
                onChange={e => setPayee({ ...payee, name: e.currentTarget.value })}
                ref={nameInputRef}
            />
            <label htmlFor='name'>Name</label>
            <input
                className={`${inputfieldbg} ${text} pr-5`}
                type='text'
                name='email'
                id='email'
                value={payee.email}
                onChange={e => setPayee({ ...payee, email: e.currentTarget.value })}
            />
            <label htmlFor='email'>Email</label>
            <span className={`${border} ${hover} w-min p-2 mx-auto m-2 hover:cursor-pointer`} onClick={handleSubmit} tabIndex={2}>Save</span>
        </div>
    )

}

export default DonorForm;