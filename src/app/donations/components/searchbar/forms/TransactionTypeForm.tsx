"use client"
import { useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "../SearchBar";
import { useProvider } from "@/app/context/useProvider";
import {useTheme} from "@/app/context/theme/ThemeProvider";
import { ModalContext } from "@/app/context/modal/ModalProvider";

interface TransactionFormState {
    name: string;
}

const TransactionTypeForm = () => {
    const {valueFromSearchBar, toggleForm, setSelectedOption} = useProvider(FormContext);
    const {altText, bg, inputfieldbg, border, hover, text} = useTheme()

    const [transactionType, setTransactionType] = useState<TransactionFormState>({
        name: valueFromSearchBar,
    });

    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, []);

    const handleTransActionSubmit = async () => {
        console.log(transactionType);
        
        const res = await fetch('/api/fuckyou', {
            method: 'POST',
            body: JSON.stringify({
                name: transactionType.name,
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
                value={transactionType.name}
                onChange={e => setTransactionType({ ...transactionType, name: e.currentTarget.value })}
                ref={nameInputRef}
            />
            <label className={`${altText}`} htmlFor='name'>Name</label>
            <span className={`${border} ${hover} w-min p-2 mx-auto m-2 hover:cursor-pointer`} onClick={handleTransActionSubmit} tabIndex={2}>Save</span>
        </div>
    )
}

export default TransactionTypeForm;