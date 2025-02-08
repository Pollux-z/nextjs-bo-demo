import React from "react";

type SeleteComponentsType = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  name: string;
  data: any;
};

const SeleteComponents: React.FC<SeleteComponentsType> = ({
  value,
  onChange,
  name,
  data,
}) => {
  return (
    <select
      title="team"
      value={value}
      onChange={onChange}
      name={name}
      className="border py-5 px-5 w-full rounded-md  mt-1 text-xs"
    >
      <option value="none">None</option>
      {data.map((val: any, index: number) => (
        <option key={index}>{val}</option>
      ))}
    </select>
  );
};

export default SeleteComponents;
