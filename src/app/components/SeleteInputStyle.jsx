import React from "react";

function SeleteInputStyle({
  data,
  lableText,
  value,
  setValue,
  inputName,
  firstSeleteText,
}) {
  return (
    <div>
      <label htmlFor={inputName} className="text-sm">{lableText}</label>
      <select 
      value={value} 
      onChange={setValue} 
      name={inputName}
      className="border py-5 px-5 w-full rounded-md  mt-1 text-xs border-gray-300 text-gray-900 block"
      >
        <option value="null">{firstSeleteText}</option>
        {data.map((i, index) => (
          <option value={i} key={index}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SeleteInputStyle;
