import { IWorkprocess } from "@/interfaces/Workprocess";
import React from "react";
import { CiFileOn } from "react-icons/ci";

type TableWorkprocessProps = {
  workprocesses: IWorkprocess[];
};

const TableWorkprocess: React.FC<TableWorkprocessProps> = ({
  workprocesses,
}) => {
  return (
    <table className="table-auto text-left mt-5 min-w-full md:table-fixed">
      <thead className="border-b">
        <tr className="*:py-3 *:px-3 *:font-normal text-sm">
          <td>ID</td>
          <td className="rounded-s-md ">Title</td>
          <td className="w-1/6">Owner Team</td>
          <td className="w-1/6">File</td>
          <td>Remark</td>
        </tr>
      </thead>
      <tbody>
        {workprocesses?.map((work, index: number) => (
          <tr
            key={index}
            className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16"
          >
            <td>{work.id}</td>
            <td className="text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
              {work.title}
            </td>
            <td className="text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
              {work.teamOwner}
            </td>
            <td>
              <a
                title="Download file"
                href={work.fileUrl}
                target="blank"
                className={!work.fileUrl ? "pointer-events-none" : undefined}
              >
                <CiFileOn
                  size={25}
                  className={
                    !work.fileUrl
                      ? "p-1 bg-gray-100 text-gray-600 rounded-full"
                      : "p-1 bg-blue-100 text-blue-600 rounded-full"
                  }
                />
              </a>
            </td>
            <td>{work.remark}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableWorkprocess;
