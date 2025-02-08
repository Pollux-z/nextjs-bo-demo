import React from "react";

type inputType = {
  label: string;
  value?: string;
  name?: string;
  type: string;
  placeholder: string;
  required: boolean;
  onChange: (value: string ) => void;
};

const InputComponent: React.FC<inputType> = ({
  label,
  value,
  name,
  type,
  placeholder,
  required,
  onChange,
}) => {
  const haddleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value as string;
    onChange(target);
  };

  return (
    <>
      <label htmlFor="nameTh" className="text-xs">
        {label} {required && <span className="text-red-500"> ( Request )</span>}
      </label>
      <input
        value={value}
        onChange={haddleChange}
        placeholder={placeholder}
        type={type}
        name={name}
        aria-label={name}
        className="text-xs mt-1 w-full border border-gray-300 rounded-md p-4"
      />
    </>
  );
};

export default InputComponent;
