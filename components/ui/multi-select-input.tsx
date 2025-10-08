"use client";
import React, { useState, KeyboardEvent, ChangeEvent } from "react";

interface MultiSelectInputProps {
  placeholder?: string;
  onChange?: (values: string[]) => void;
}

export const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  placeholder = "Type and press Enter...",
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [values, setValues] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      if (!values.includes(inputValue.trim())) {
        const newValues = [...values, inputValue.trim()];
        setValues(newValues);
        onChange?.(newValues);
      }
      setInputValue("");
      e.preventDefault();
    }
  };

  const handleRemove = (val: string) => {
    const newValues = values.filter((v) => v !== val);
    setValues(newValues);
    onChange?.(newValues);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border rounded px-2 py-1 min-h-[44px] focus-within:ring-2 ring-blue-400">
      {values.map((val) => (
        <span
          key={val}
          className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium mr-2 mb-1"
        >
          {val}
          <button
            type="button"
            className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
            onClick={() => handleRemove(val)}
            aria-label={`Remove ${val}`}
          >
            &times;
          </button>
        </span>
      ))}
      <input
        className="flex-1 min-w-[120px] border-none outline-none bg-transparent py-1"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
};
