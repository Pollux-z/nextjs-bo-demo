import React from "react";

type inputType = {
  value: string;
  name: string;
  type: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const InputComponents: React.FC<inputType> = ({ value, onChange, name, type }) => {
  return (
    <input
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      aria-label={name}
      className=" py-5 px-5 w-full rounded-md  mt-1 text-xs border"
    />
  );
}

export default InputComponents;
