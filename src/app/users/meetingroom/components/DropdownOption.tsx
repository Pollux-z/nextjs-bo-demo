import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { CiMenuKebab } from "react-icons/ci";
import BtnDelete from "./BtnDelete";

type Props = {
  id: string
} 

const DropdownOption:React.FC<Props> = ({ id }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5    text-sm font-semibold text-gray-900   ">
          <CiMenuKebab />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
            type="button"
            title="Delete"
            className="px-3 py-1 text-sm text-gray-700 data-[focus]:bg-red-100 data-[focus]:text-red-900 w-full text-left flex">
              <BtnDelete id={id} btnText={`Delete`}/>
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}

export default DropdownOption;
