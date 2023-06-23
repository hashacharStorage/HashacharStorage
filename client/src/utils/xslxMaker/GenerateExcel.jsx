import React from "react";
import * as XLSX from "xlsx";

const ExcelTableGenerator = () => {
  const user = {
    fname: "liram",
    lname: "goli",
    company: "cellcom",
    team: "north",
  };
  const data = [
    { name: "Product A", serial: "ABC123", quantity: 10, isBlack: true },
    { name: "Product B", serial: "DEF456", quantity: 5, isBlack: true },
    { name: "Product A", serial: "ABC123", quantity: 1, isBlack: false },
    { name: "Product A", serial: "ABC123", quantity: 2, isBlack: false },
    // Add more objects as needed
  ];
  const generateExcelTable = () => {
    const nameCell = ["Name:", `${user.fname} ${user.lname}`];
    const worksheet = XLSX.utils.aoa_to_sheet([
      [
        "Date:",
        {
          t: "s",
          s: { alignment: { readingOrder: 2 } },
          v: new Date().toLocaleDateString(),
        },
      ],
      nameCell,
      ["Company:", user.company],
      ["Team:", user.team],
      [],
      ["Name", "Serial", "Quantity", "isBlack"],
      ...data
        .filter((item) => item.isBlack)
        .map((item) => [item.name, item.serial, item.quantity, item.isBlack]),
      [],
      ["Name", "Serial", "Quantity", "isBlack"],
      ...data
        .filter((item) => !item.isBlack)
        .map((item) => [item.name, item.serial, item.quantity, item.isBlack]),
    ]);

    const columnWidths = [
      { wch: 25 }, // Width for the first column (Name)
      { wch: 15 }, // Width for the second column (Serial)
      { wch: 10 }, // Width for the third column (Quantity)
      { wch: 10 }, // Width for the fourth column (isBlack)
    ];

    columnWidths.forEach((width, index) => {
      const col = XLSX.utils.encode_col(index);
      worksheet["!cols"] = worksheet["!cols"] || [];
      worksheet["!cols"].push({ ...width, wpx: width.wch * 7 });
      worksheet["!cols"][index].width = width.wch;
      worksheet["!cols"][index].customWidth = 1;
      worksheet["!cols"][index].hidden = 0;
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "excel_table.xlsx");
  };

  return (
    <div>
      <button onClick={generateExcelTable}>Download Excel</button>
    </div>
  );
};

export default ExcelTableGenerator;
