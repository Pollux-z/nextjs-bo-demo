import React from "react";

function InputStyle({ lableText, value, setValue, inputType, inputName }) {
  return (
    <div>
      <label htmlFor={inputName} className="text-sm">{lableText}</label>
      <input
        value={value}
        onChange={setValue}
        type={inputType}
        name={inputName}
        className="border py-5 px-5 w-full rounded-md  mt-1 text-xs border-gray-300 text-gray-900 block"
      />
    </div>
  );
}

export default InputStyle;
