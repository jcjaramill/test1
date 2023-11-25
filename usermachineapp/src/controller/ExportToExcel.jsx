import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

    const exportToCSV = (apiData, fileName) => {
    console.log(apiData)
    const ws = XLSX.utils.json_to_sheet(apiData);
    console.log(ws)
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    console.log(wb)
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    console.log(excelBuffer)
    const data = new Blob([excelBuffer], { type: fileType });
    console.log(data)
    FileSaver.saveAs(data, 'Usuarios '+ fileName + fileExtension);
  };

  return (
    <button id="btnDownload" onClick={(e) => exportToCSV(apiData, fileName)} className="btn btn-success btn-sm"
    ><img src="/images/excel.png" width='20px'></img> Descargar Excel
    </button>
  );
};