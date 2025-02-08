import { TimeOff } from "@/interfaces/TimeOff";
import { UsersType } from "@/interfaces/User";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import GetTotalLeave from "../timeoffAdmin/components/GetTotalLeave";
import GetMonthTimeOff from "../timeoffAdmin/components/GetMonthTimeOff";
import GetTotalTimeOff from "../timeoffAdmin/components/GetTotalTimeOff";
import GetCalculateBalanceTimeOff from "../timeoffAdmin/components/GetCalculateBalanceTimeOff";
// import { getTotalTimeOff, getMonthTimeOff } from "./table/TableReportTimeOff";
import { getTotalLeave } from "./CalculateLeave";
import { TopUpType } from "@/interfaces/TopUp";

type ExportExcelTimeOffType = {
  users: Array<UsersType>;
  timeOffs: Array<TimeOff>;
  sortType: string;
  fileName: string;
  sheetName: string;
  sortYear: number;
  topups: TopUpType[];
};

type GetExportTimeOff = {
  title: string;
  worksheetname: string;
  sortType: string;
};

const ExportExcelTimeOff: React.FC<ExportExcelTimeOffType> = ({
  users,
  timeOffs,
  fileName,
  sheetName,
  sortType,
  sortYear,
  topups
}) => {

  const onGetExporTimeOff = ({
    title,
    worksheetname,
    sortType,
  }: GetExportTimeOff) => {
    try {

      // Check if the action result contains data and if it's an array
      if (users && Array.isArray(users)) {
        
        const dataToExport = users
          ?.map((user) =>
            sortType === "Vacation"
              ? {
                  เลขที่พนักงาน: user?.userCode,
                  ชื่อ: user?.nameTh,
                  ชื่อเล่น: user?.nickNameTh,
                  ทีม: user?.employeeTeams,
                  วันเริ่มงาน: user?.startDate,
                  "วันลาพักร้อนคงเหลือจากปี 66": user?.year2023Leave
                    ? user?.year2023Leave.vacationLeave
                    : 0,
                  "วันลาในปี 67": user?.year2024Leave?.vacationLeave,
                  "วันลาสะสมทั้งหมดที่ได้ในปี 67": getTotalLeave({
                    sortType: sortType,
                    users: user,
                  }),
                  "ม.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 1,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: sortYear,
                  }),
                  "ก.พ. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 2,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: sortYear,
                  }),
                  "มี.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 3,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: sortYear,
                  }),
                  "เม.ย. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 4,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: sortYear,
                  }),
                  "พ.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 5,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: sortYear,
                  }),
                  "มิ.ย. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 6,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: sortYear,
                  }),
                  "ก.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 7,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: sortYear,
                  }),
                  "ส.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 8,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: sortYear,
                  }),
                  "ก.ย. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 9,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: sortYear,
                  }),
                  "ต.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 10,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: sortYear,
                  }),
                  "พ.ย. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 11,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: sortYear,
                  }),
                  "ธ.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 12,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: sortYear,
                  }),
                  จำนวนวันที่ลาไปแล้ว: GetTotalTimeOff({
                    data: timeOffs,
                    sortType: sortType, 
                    users: user,
                    sortYear: sortYear,
                  }),
                  วันลาพักร้อนคงเหลือ: 
                  GetCalculateBalanceTimeOff({
                    users: user,
                    timeOffs: timeOffs,
                    sortType: sortType,
                    sortYear: sortYear,
                    topups: topups,
                  }),
                }
              : sortType === "Personal Leave"
              ? {
                  เลขที่พนักงาน: user?.userCode,
                  ชื่อ: user?.nameTh,
                  ชื่อเล่น: user?.nickNameTh,
                  ทีม: user?.employeeTeams,
                  วันเริ่มงาน: user?.startDate,
                  "ม.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 1,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "ก.พ. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 2,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "มี.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 3,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "เม.ย. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 4,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "พ.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 5,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "มิ.ย. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 6,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "ก.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 7,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "ส.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 8,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "ก.ย. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 9,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "ต.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 10,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "พ.ย. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 11,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "ธ.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 12,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  จำนวนวันที่ลาไปแล้ว: GetTotalTimeOff({
                    data: timeOffs,
                    sortType: sortType,
                    users: user,
                    sortYear: 2024,
                  }),
                  วันลากิจคงเหลือ: 
                  GetCalculateBalanceTimeOff({
                    users: user,
                    timeOffs: timeOffs,
                    sortType: sortType,
                    sortYear: sortYear,
                    topups: topups,
                  }),
                }
              : sortType === "Sick Leave"
              ? {
                  เลขที่พนักงาน: user?.userCode,
                  ชื่อ: user?.nameTh,
                  ชื่อเล่น: user?.nickNameTh,
                  ทีม: user?.employeeTeams,
                  วันเริ่มงาน: user?.startDate,
                  "ม.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 1,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "ก.พ. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 2,
                    data: timeOffs,
                    sortType: sortType, 
                    sortYear: 2024,    
                  }),
                  "มี.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 3,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "เม.ย. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 4,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "พ.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 5,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "มิ.ย. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 6,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "ก.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 7,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "ส.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 8,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "ก.ย. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 9,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "ต.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 10,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "พ.ย. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 11,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  "ธ.ค. 67": GetMonthTimeOff({
                    id: user?._id,
                    month: 12,
                    data: timeOffs,
                    sortType: sortType,
                    sortYear: 2024,
                  }),
                  จำนวนวันที่ลาไปแล้ว: GetTotalTimeOff({
                    data: timeOffs,
                    sortType: sortType,
                    users: user,
                    sortYear: 2024,
                  }),
                  วันลาป่วยคงเหลือ: 
                  GetCalculateBalanceTimeOff({
                    users: user,
                    timeOffs: timeOffs,
                    sortType: sortType,
                    sortYear: sortYear,
                    topups: topups,
                  }),
                }
              : null
          )
          .reverse();


        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
      } else {
        console.log("#==================Export Error");
      }
    } catch (error: any) {
      console.log("#==================Export Error", error.message);
    }
  };
  return (
    <button
      type="button"
      onClick={() =>
        onGetExporTimeOff({
          title: fileName,
          worksheetname: sheetName,
          sortType: sortType,
        })
      }
      className="bg-blue-500 text-white py-2 px-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-light"
    >
      Excel report
    </button>
  );
};

export default ExportExcelTimeOff;
