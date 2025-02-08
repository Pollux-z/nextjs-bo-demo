import React, { useState } from "react";
import { StatusResign } from "@/app/db/option";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  useDeleteResignation,
  useUpdateResignationMainPage,
} from "@/app/services/mutations";
import { ResignationType } from "@/interfaces/Resignation";
import Link from "next/link";

function DropdownSelete({ resignation }: { resignation: ResignationType }) {
  const [showSelete, setShowSelete] = useState<boolean>(false);
  const [option, setOption] = useState<string>("");

  const id = resignation.id;

  const { trigger: updateResignation } = useUpdateResignationMainPage(id);
  const { trigger: deleteResignation } = useDeleteResignation(id);

  const handleShowSelete = () => {
    setShowSelete(!showSelete);
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this resignation?"
    );
    if (!confirm) return;
    await deleteResignation();
  };

  const handleSeleted = async (option: string) => {
    setOption(option);
    setShowSelete(false);

    updateResignation({
      ...resignation,
      status: option,
    });
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        !event.target.closest(".dropdown-container")
      ) {
        setShowSelete(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex  justify-center ">
      <button
        onClick={() => handleShowSelete()}
        type="button"
        className="text-sm text-gray-600 font-semibold hover:bg-gray-50 flex   rounded-md  gap-1 transition-all duration-300"
      >
        <BsThreeDotsVertical size={18} className="text-gray-500" />
        {}
      </button>
      <div
        className={`transition-all duration-300 absolute z-10 shadow-md rounded-md  transform  bg-gray-50 text-gray-600 w-64 p-2 ${
          showSelete
            ? "visible scale-100 opacity-100"
            : "invisible scale-90 opacity-0"
        } right-10 mt-2 `}
      >
        <ul className="space-y-1">
          {StatusResign?.map((option, index) => (
            <li key={index} className="">
              <button
                onClick={() => handleSeleted(option)}
                className="hover:bg-gray-100 w-full text-left text-sm py-1.5 px-3 rounded-md transition-all duration-300"
                type="button"
              >
                {option}
              </button>
            </li>
          ))}
          <li className="flex gap-3 ">
            <Link
              className="bg-green-100 text-green-500 hover:bg-green-500 hover:text-white w-full  text-sm py-1.5 px-3 rounded-md transition-all duration-300 "
              href={`/admin/resignationAdmin/${id}`}
            >
              View
            </Link>
            <button
              onClick={() => handleDelete()}
              className="bg-red-100 text-red-500 hover:bg-red-500 hover:text-white w-full text-sm py-1.5 px-3 rounded-md transition-all duration-300 "
              type="button"
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DropdownSelete;
