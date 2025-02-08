
import * as XLSX from "xlsx";

const ExportExcel = () => {
  const exportData = () => {
    const data = [
      ["Name", "Team", "Project", "ManDay", "MD Target (Band)", "Utilization"],
      ["Chanakan Opasirisunthon", "Business Assessment & Research", 3, 62, "", ""],
      ["Suntaree Thaweepot", "Business Assessment & Research", 2, 48.5, "", ""],
      ["Sanapat Boonsuya", "Business Assessment & Research", 0, 68.5, "", ""],
      ["", "", "", "", 544.5, ""],
      ["Nuttaya Sinsomanus", "Digital Innovation & Organization", 1, 3.5, "", ""],
      ["Jes Sie Tham", "Digital Innovation & Organization", 0, 0, "", ""],
      ["", "", "", "", 15, ""],
      ["Tanakorn Malawan", "Digital Transformation", 1, 36, "", ""],
      ["Putar Sorbonto", "Digital Transformation", 1, 45, "", ""],
      ["", "", "", "", 783, ""],
      ["", "", "", "", 2338.00, ""],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "Updated_Excel_Report.xlsx");
  };

  return <button onClick={exportData}>Export Excel</button>;
};

export default ExportExcel;
