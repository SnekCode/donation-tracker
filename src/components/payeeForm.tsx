"use client"
import { useEffect, useRef, useState } from "react";
import { DonorOption } from "./SearchBar";

    
//   event.preventDefault();
//   // Handle form submission here
//   // take form data and send to server /api/payee
//   fetch('/api/payee', {
//     method: 'POST',
//     body: JSON.stringify({
//       name: event.currentTarget.name.valueOf(),
//       email: event.currentTarget.email.valueOf(),
//     }),
//     });
//     // if successful, close form
//     setShowForm(false);

// };

interface PayeeFormProps {
    toggleform: () => void;
    valueFromSearchBar: string;
    searchbarcallback: (data: DonorOption) => void;
}

interface PayeeFormState {
    name: string;
    email: string;
}

const PayeeForm = ({ toggleform, valueFromSearchBar, searchbarcallback }: PayeeFormProps) => {
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
        
        const res = await fetch('/api/payee', {
            method: 'POST',
            body: JSON.stringify({
                name: payee.name,
                email: payee.email,
            }),
        });
        // if successful, close form
        const data = await res.json();
        searchbarcallback({value: data.id, label: data.name});
        toggleform();
    }

    return (
        <div >
            <label htmlFor='name'>Name</label>
            <input
                className="text-slate-700"
                type='text'
                name='name'
                id='name'
                value={payee.name}
                onChange={e => setPayee({ ...payee, name: e.currentTarget.value })}
                ref={nameInputRef}
            />
            <label htmlFor='email'>Email</label>
            <input
                className="text-slate-700"
                type='text'
                name='email'
                id='email'
                value={payee.email}
                onChange={e => setPayee({ ...payee, email: e.currentTarget.value })}
            />
            <button onClick={handleSubmit} tabIndex={2}>Save</button>
        </div>
    )

}

export default PayeeForm;