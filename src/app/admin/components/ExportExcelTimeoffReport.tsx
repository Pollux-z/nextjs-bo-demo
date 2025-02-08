import React from 'react';
import * as XLSX from 'xlsx';

// ...existing code...

interface SheetFile {
    sheetName: string;
    data: any[];
}

const ExportExcelTimeoffReport = (sheets: SheetFile[], fileName: string) => {

    const workbook = XLSX.utils.book_new();
    sheets.forEach(({ sheetName, data }) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      });
    XLSX.writeFile(workbook, `${fileName}.xlsx`);


};

export default ExportExcelTimeoffReport;
