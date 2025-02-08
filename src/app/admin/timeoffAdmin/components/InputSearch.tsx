import React, { useState } from "react";
import { GoSearch } from "react-icons/go";

type InputSearchType = {
  searchQuery: string;
  setSearchQuery: any;
}

 const InputSearch = ({ searchQuery, setSearchQuery }: InputSearchType) => {
  return (
    <div className="relative mt-2 rounded-md shadow-sm">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-xs"
      />
      <div className=" bg-[#845BDF] absolute inset-y-0 right-0 flex items-center px-3 rounded-e-md">
        <GoSearch className="text-white" size={13} />
      </div>
    </div>
  );
}

export default InputSearch
