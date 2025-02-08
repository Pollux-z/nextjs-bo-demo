import { UsersType } from "@/interfaces/User";
import React from "react";
import Select from "react-select";
import type { Role } from "@/app/db/option";

type TeamSeleteInputType = {
  label: string;
  role: typeof Role | null;
  name: string;
  seleteRole: any;
  setSeleteRole: any;
  placeholder?: string;
};

const SeletionRole: React.FC<TeamSeleteInputType> = ({
  label,
  role,
  name,
  seleteRole,
  setSeleteRole,
  placeholder
}) => {
  
  const option = role?.map((val: any, index: number) => ({
    value: val,
    label: val
  
  }));

  return (
    <>
      <label htmlFor="team" className="text-xs">
        {label}
      </label>
      <Select
        value={seleteRole}
        onChange={setSeleteRole}
        isClearable
        isSearchable
        name={name}
        options={option}
        className="text-sm mt-2"
        placeholder={placeholder}
        styles={{
          control: (styles) => ({
            ...styles,
            height: "45px",
            width: "100%",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
          }),
        }}
      
      />
    </>
  );
};

export default SeletionRole;
