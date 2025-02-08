import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import BtnDelete from "./button/BtnDelete";

export default function DropdownOption({ id, hrefEdit }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center rounded-md bg-white  text-sm font-semibold text-gray-900   hover:bg-gray-50 p-1">
          <BsThreeDotsVertical size={12} />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href={hrefEdit}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 w-full text-left"
            >
              Edit
            </a>
          </MenuItem>
          <MenuItem>
            <BtnDelete data={id} />
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
