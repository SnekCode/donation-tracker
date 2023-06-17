'use client'
import { useState } from 'react';
import Select from 'react-select';
import  PayeeForm  from '@/components/payeeForm';



export interface DonorOption {
    value: string;
    label: string;
}

interface SearchBarProps {
    donorOptions: DonorOption[];
}

const SearchBar = ({ donorOptions }: SearchBarProps) => {
    const [showForm, setShowForm] = useState(false);
    const [valueFromSearchBar, setValueFromSearchBar] = useState('');
    const [selectedOption, setSelectedOption] = useState<DonorOption | null>(null);

    const toggleform = () => {
      setShowForm(state => !state);
    };

      if (showForm) {
        return (
            <PayeeForm searchbarcallback={setSelectedOption} toggleform={toggleform} valueFromSearchBar={valueFromSearchBar} />
        )}

    return (
        <Select
        onInputChange={(selectedOption) => setValueFromSearchBar(selectedOption)}
        onChange={(selectedOption) => setSelectedOption(selectedOption)}
        value={selectedOption}
        name='payee'
        className='text-slate-700'
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                toggleform();
            }
        }}
        options={donorOptions}
        isSearchable={true}
        noOptionsMessage={() => <span className='text-slate-700'>No donors found <button onClick={toggleform}>Create New Donor</button></span>}
      />
    );
}

export default SearchBar;