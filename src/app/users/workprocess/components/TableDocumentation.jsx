import React from "react";
import { FcFolder } from "react-icons/fc";
import { CiSaveDown2 } from "react-icons/ci";

function TableDocumentation() {
  return (
    <div className="overflow-auto">
      <table className="table-auto w-full text-sm shadow-sm ">
        <thead>
          <tr className="text-left h-14 bg-white">
            <th className="px-2">File Name</th>
            <th>Category</th>
            <th>Date Modified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-sm odd:bg-slate-50 even:bg-white h-14">
            <td className="px-2">
              <div className="flex gap-2">
                <FcFolder size={18} />
                <p className="line-clamp-1">File name</p>
              </div>
            </td>
            <td>Name Category</td>
            <td>23 Nov 2023</td>
            <td>
              <CiSaveDown2
                size={28}
                className="bg-blue-50 text-blue-600 p-1 ring-1 rounded-full hover:bg-blue-600 hover:text-white"
              />
            </td>
          </tr>

          <tr className="text-sm odd:bg-slate-50 even:bg-white h-14">
            <td className="px-2">
              <div className="flex gap-2">
                <FcFolder size={18} />
                <p className="line-clamp-1">File name</p>
              </div>
            </td>
            <td>Name Category</td>
            <td>23 Nov 2023</td>
            <td>
              <CiSaveDown2
                size={28}
                className="bg-blue-50 text-blue-600 p-1 ring-1 rounded-full hover:bg-blue-600 hover:text-white"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableDocumentation;
