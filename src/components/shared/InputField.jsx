import React from "react";

const InputField = ({
  label,
  id,
  type,
  value,
  onChange,
  disabled,
  required,
  placeholder = "",
}) => {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder || label}
        className="relative block w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out"
      />
    </div>
  );
};

export default InputField;
