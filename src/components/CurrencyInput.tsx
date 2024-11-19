import React from 'react';

interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id: string;
}

const CurrencyInput = ({ label, value, onChange, placeholder, id }: CurrencyInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    onChange(value);
  };

  const formatValue = (value: string) => {
    if (!value) return '';
    return Number(value).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
        <input
          type="text"
          id={id}
          value={formatValue(value)}
          onChange={handleChange}
          placeholder={placeholder}
          className="input-field pl-8"
        />
      </div>
    </div>
  );
};

export default CurrencyInput;