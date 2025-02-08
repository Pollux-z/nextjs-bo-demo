import { UsersType } from "@/interfaces/User";
import React from "react";

import * as XLSX from "xlsx";
import FucntionExportExcel from "./FucntionExportExcel";

interface IExportExcelBilibility {
  data: UsersType[];
  fileName: string;
}

const ExportExcelBilibility: React.FC<IExportExcelBilibility> = ({
  data,
  fileName
}) => {

    const sheets = [
        {
        sheetName: "Billability",
        data: data?.map((user) => {
            return {
            Name: user.nameEng,
            Team: user.employeeTeams,
            Project: user.userBillability?.length,
            ManDay: user.totalManday,
            };
        }),
        },
    ];

    const handleExportExcel = () => {
        FucntionExportExcel(sheets, fileName);
    }

    return (
        <button
        onClick={handleExportExcel}
        className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded text-sm transition duration-300"
        >
        Export Excel
        </button>
    )
};

export default ExportExcelBilibility;
