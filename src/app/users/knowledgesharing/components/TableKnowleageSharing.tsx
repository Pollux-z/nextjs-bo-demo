import React from "react";
import { useGetKnowledges } from "@/app/services/queries";
import { KnowledgeType } from "@/interfaces/Knowledge";

import { FaRegFilePdf, FaRegFileWord } from "react-icons/fa6";
import {
  PiMicrosoftExcelLogo,
  PiMicrosoftPowerpointLogo,
} from "react-icons/pi";
import Loading from "@/app/loading";

interface TableKnowleageSharingType {
  searchQuery: string;
  filter: string;
}

const TableKnowleageSharing: React.FC<TableKnowleageSharingType> = ({ searchQuery, filter }) => {
  const { data: getKnowledges, isLoading, error } = useGetKnowledges();

  const filteredKnowledges = getKnowledges?.filter((knowledge: KnowledgeType) => {
    
    if (filter === "All") return knowledge.title.toLowerCase().includes(searchQuery?.toLowerCase());

    const knowledgeSearch = knowledge.title.toLowerCase().includes(searchQuery?.toLowerCase());
    const knowledgeFilter = knowledge.categorySharing === filter;

    return knowledgeSearch && knowledgeFilter;
  });

  if (isLoading) return <Loading />;

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <>
      <div className="overflow-auto bg-white p-4 rounded-md shadow-sm">
        <table className="table-auto w-full text-sm text-left">
          <thead className="">
            <tr className="h-10 *:px-4">
              <th className="text-center">ID</th>
              <th>Title</th>
              <th>Team Owner</th>
              <th className="text-center">File</th>
            </tr>
          </thead>
          <tbody >
            {filteredKnowledges?.map((knowledge: KnowledgeType) => (
              <tr key={knowledge.id_} className="border-t h-12 odd:bg-white even:bg-gray-50 *:px-4">
                <td className="text-center">{knowledge.id_}</td>
                <td className="truncate">{knowledge.title}</td>
                <td>{knowledge.teamOwner}</td>
                <td className="">
                  <a
                    className=" w-8 h-8 mx-auto flex justify-center items-center"
                    href={knowledge.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {iconByFileType(knowledge.fileTypes)}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableKnowleageSharing;


const iconByFileType = (fileType: string) => {
  switch (fileType) {
    case "PDF":
      return <FaRegFilePdf size={20} className="text-red-500" />;
    case "WORD":
      return <FaRegFileWord size={20} className="text-blue-500" />;
    case "EXCEL":
      return <PiMicrosoftExcelLogo size={20} className="text-green-500" />;
    case "PPT":
      return (
        <PiMicrosoftPowerpointLogo size={20} className="text-orange-500" />
      );
    default:
      return <FaRegFilePdf size={20} className="text-gray-500" />;
  }
};

// {
//   "id": "672b2b0bf5611a6ca455af1d",
//   "v": 0,
//   "createdAt": "2024-11-06T08:38:35.090Z",
//   "description": "Bain & Company_e-Conomy SEA 2022",
//   "fileTypes": "PDF",
//   "fileUrl": "https://timeconsultings.sharepoint.com/:b:/s/CDTeam/EUScFCPDNnVNqSyXiy5bwIgBqUFICeydiK5a0SDxc7GM1g?e=7XHlOb",
//   "id_": 1,
//   "imgUrl": "https://images.unsplash.com/photo-1603702607501-a0e27733e2e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWNjb25vbXl8ZW58MHx8MHx8fDA%3D",
//   "isActive": true,
//   "localCreatedAt": "2024-11-06T15:38:35.091Z",
//   "localUpdatedAt": "2024-11-06T15:38:35.103Z",
//   "teamOwner": "TIME",
//   "title": "Bain & Company_e-Conomy SEA 2022",
//   "updatedAt": "2024-11-06T08:38:35.090Z",
//   "userCreate": "System"
// },
