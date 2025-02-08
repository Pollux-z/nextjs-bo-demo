import React from 'react'

type InputFunctionType = {
  labelText: string;
  value: number | string;
  onChange: any;
  type: string;
  placeholder: string | undefined;
  name: string;
  disabled: boolean;
};

const InputFunction: React.FC<InputFunctionType> = ({ labelText, value, onChange, type, placeholder, name, disabled }) => {
  return (
    <>
    <label htmlFor={name} className="text-sm">
          {labelText ? labelText : null}
        </label>
        <input
          disabled={disabled}
          value={value}
          onChange={onChange}
          type={type ? type : "text"}
          placeholder={placeholder ? placeholder : undefined}
          name={name}
          className={disabled ? "bg-[#F5F6FA] py-5 px-5 w-full rounded-md  mt-1 text-xs text-gray-500" : "border border-gray-300 py-5 px-5 w-full rounded-md  mt-1 text-xs"}
        />
    </>
  )
}

export default InputFunction