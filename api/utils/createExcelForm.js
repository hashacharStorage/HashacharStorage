const XLSX = require('xlsx');

function createExcelForm(user, orders) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([]);

  // Set user info
  const userInfo = [
    ['First Name:', user.firstname],
    ['Last Name:', user.lastname],
    ['Warehouse:', user.warehouse],
    ['Team:', user.team],
    ['Company:', user.company],
  ];
  XLSX.utils.sheet_add_aoa(worksheet, userInfo);

  // Add empty lines separator
  XLSX.utils.sheet_add_aoa(worksheet, [['', '']]);
  XLSX.utils.sheet_add_aoa(worksheet, [['', '']]);

  // Separate products based on isBlack property
  const blackProducts = orders.filter(order => order.isBlack);
  const nonBlackProducts = orders.filter(order => !order.isBlack);

  // Add black products table
  XLSX.utils.sheet_add_aoa(worksheet, [['Black Products']]);
  const blackProductsHeader = ['Product ID', 'Serial', 'Quantity'];
  const blackProductsData = blackProducts.map(order => [order.product_id, order.serial, order.quantity]);
  XLSX.utils.sheet_add_aoa(worksheet, [blackProductsHeader]);
  XLSX.utils.sheet_add_aoa(worksheet, ...blackProductsData);

  // Add empty lines separator
  XLSX.utils.sheet_add_aoa(worksheet, [['', '']]);
  XLSX.utils.sheet_add_aoa(worksheet, [['', '']]);

  // Add non-black products table
  XLSX.utils.sheet_add_aoa(worksheet, [['Non-Black Products']]);
  const nonBlackProductsHeader = ['Product ID', 'Serial', 'Quantity'];
  const nonBlackProductsData = nonBlackProducts.map(order => [order.product_id, order.serial, order.quantity]);
  XLSX.utils.sheet_add_aoa(worksheet, [nonBlackProductsHeader]);
  XLSX.utils.sheet_add_aoa(worksheet, ...nonBlackProductsData);

  // Add "Print Twice" line if user.team === 2
  if (user.team === 2) {
    XLSX.utils.sheet_add_aoa(worksheet, [['', '']]);
    XLSX.utils.sheet_add_aoa(worksheet, [['', '']]);
    XLSX.utils.sheet_add_aoa(worksheet, [['Print Twice']]);
  }

  // Set column width
  const colWidth = 12;
  const columns = [
    { wch: colWidth },
    { wch: colWidth },
    { wch: colWidth },
  ];
  worksheet['!cols'] = columns;

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Save the workbook
  const filePath = 'form.xlsx';
  XLSX.writeFile(workbook, filePath);

  console.log('Excel form saved:', filePath);
}
