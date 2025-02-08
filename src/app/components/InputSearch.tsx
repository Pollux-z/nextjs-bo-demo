import React from "react";
import { GoSearch } from "react-icons/go";

type InputSearchType = {
  searchQuery: string
  setSearchQuery: any
}

const InputSearch: React.FC<InputSearchType> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative rounded-md shadow-sm bg-red-200  max-h-24">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="block w-full min-h-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-xs"
      />
      <div className="bg-[#845BDF] absolute inset-y-0 right-0 flex items-center px-3 rounded-e-md h-full" >
        <GoSearch className="text-white" size={13} aria-hidden="true"/>
      </div>
    </div>
  );
};

export default InputSearch;