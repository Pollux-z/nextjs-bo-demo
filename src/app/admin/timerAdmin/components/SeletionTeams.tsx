import { UsersType } from "@/interfaces/User";
import React from "react";
import Select from "react-select";

type TeamSeleteInputType = {
  label: string;
  users: UsersType[];
  name: string;
  setSeletedTeam: any;
  seletedTeam: any;
  placeholder?: string;
};

const SeletionTeams: React.FC<TeamSeleteInputType> = ({
  label,
  users,
  name,
  seletedTeam,
  setSeletedTeam,
  placeholder
}) => {
  
  const optionUsers = users?.map((val: any, index: number) => ({
    value: val?._id,
    label: `TIME-${val?.userCode.toString().padStart(2, '0')} ${val?.nameTh} (${val?.nickNameTh})`,
  
  }));

  console.log(optionUsers);

  return (
    <>
      <label htmlFor="team" className="text-xs">
        {label}
      </label>
      <Select
        value={seletedTeam}
        onChange={setSeletedTeam}
        isClearable
        isSearchable
        name={name}
        options={optionUsers}
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

export default SeletionTeams;
