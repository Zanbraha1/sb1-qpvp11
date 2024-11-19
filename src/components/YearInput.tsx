import React from 'react';

interface YearInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id: string;
}

const YearInput = ({ label, value, onChange, placeholder, id }: YearInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (Number(value) <= 50) {
      onChange(value);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="input-field pr-12"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">years</span>
      </div>
    </div>
  );
};

export default YearInput;