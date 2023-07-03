import * as XLSX from "xlsx";

const generateExcelTable = (user, data) => {
  const nameCell = ["Name:", `${user.firstname} ${user.lastname}`];
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
    ...data.map((item) => [
      item.title || "",
      item.serial || "",
      item.quantity || "",
      "", // isBlack (not provided in the data structure)
    ]),
  ]);

  if (user.team === 2) {
    const printTwiceCell = {
      t: "s",
      s: {
        font: {
          bold: true,
          sz: 20,
        },
      },
      v: "print twice",
    };
    worksheet["A5"] = printTwiceCell;
  }

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

export default generateExcelTable;
