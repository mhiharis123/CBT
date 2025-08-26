import { OrderData, ParsedOrderData } from '../types';

// Column mapping based on the CSV structure from OrderList.csv
// Field indices: 0=No, 1=Session, 2=DR Code, 3=Client Code, 4=Omnibus/GK Acc No,
// 5=Order Date, 6=GTD EXPIRY DATE, 7=B/S, 8=Market, 9=Instrument Code,
// 10=Securities/Stock Name, 11=Order.QTY, 12=Order.Price, 13=MY Order Taken By,
// 14=SG Order Placed By, 15=Status, 16=Remarks, 17=Done Quantity, 18=Done Price

export const parseCSVLine = (csvLine: string): ParsedOrderData => {
  const errors: string[] = [];
  
  if (!csvLine.trim()) {
    return {
      'DR Code': '',
      'Client Code': '',
      'Omnibus/GK Acc No': '',
      'Order Date': '',
      'GTD EXPIRY DATE': '',
      'B/S': '',
      'Market': '',
      'Instrument Code': '',
      'Securities/Stock Name': '',
      'Order.QTY': '',
      'Order.Price': '',
      'Status': '',
      'Done Quantity': '',
      'Done Price': '',
      isValid: false,
      errors: ['Empty input provided']
    };
  }

  // Parse CSV line (handle quoted fields)
  const fields = parseCSVFields(csvLine);
  
  console.log('Parsed fields:', fields); // Debug log
  
  if (fields.length < 10) {
    errors.push(`Insufficient data fields. Expected at least 10 fields, got ${fields.length}`);
  }

  // Map fields according to OrderList.csv structure (0-indexed)
  // 0=No, 1=Session, 2=DR Code, 3=Client Code, 4=Omnibus/GK Acc No,
  // 5=Order Date, 6=GTD EXPIRY DATE, 7=B/S, 8=Market, 9=Instrument Code,
  // 10=Securities/Stock Name, 11=Order.QTY, 12=Order.Price, 13=MY Order Taken By,
  // 14=SG Order Placed By, 15=Status, 16=Remarks, 17=Done Quantity, 18=Done Price
  const orderData: OrderData = {
    'DR Code': fields[2] || '',
    'Client Code': fields[3] || '',
    'Omnibus/GK Acc No': fields[4] || '',
    'Order Date': fields[5] || '',
    'GTD EXPIRY DATE': fields[6] || '',
    'B/S': fields[7] || '',
    'Market': fields[8] || '',
    'Instrument Code': fields[9] || '',
    'Securities/Stock Name': fields[10] || '',
    'Order.QTY': fields[11] || '',
    'Order.Price': fields[12] || '',
    'Status': fields[15] || '',
    'Done Quantity': fields[17] || '',
    'Done Price': fields[18] || ''
  };

  // Validate required fields
  const requiredFields: (keyof OrderData)[] = [
    'DR Code', 'Client Code', 'Order Date', 'B/S', 'Market', 
    'Instrument Code', 'Securities/Stock Name', 'Order.QTY'
  ];

  requiredFields.forEach(field => {
    if (!orderData[field].trim()) {
      errors.push(`${field} is required`);
    }
  });

  return {
    ...orderData,
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
};

// Helper function to parse CSV/TSV fields handling both comma and tab separators
const parseCSVFields = (line: string): string[] => {
  // First, try to detect if it's tab-separated by checking for multiple tabs
  const tabCount = (line.match(/\t/g) || []).length;
  const commaCount = (line.match(/,/g) || []).length;
  
  // If there are more tabs than commas, treat as tab-separated
  const separator = tabCount > commaCount ? '\t' : ',';
  
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === separator && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
    i++;
  }
  
  fields.push(current.trim()); // Add last field
  
  // If we still don't have enough fields and there are spaces, try space separation as fallback
  if (fields.length < 10 && line.includes('    ')) {
    return line.split(/\s{2,}/).map(field => field.trim()).filter(field => field.length > 0);
  }
  
  return fields;
};

export const formatTableData = (orderData: OrderData): OrderData => {
  return {
    ...orderData,
    'Order.QTY': orderData['Order.QTY'].replace(/[",]/g, '').trim(),
    'Done Quantity': orderData['Done Quantity'].replace(/[",]/g, '').trim(),
    'Order.Price': orderData['Order.Price'].replace(/[p]/g, '').trim(),
    'Done Price': orderData['Done Price'].replace(/[p]/g, '').trim()
  };
};