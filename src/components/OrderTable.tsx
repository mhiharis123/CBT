import React from 'react';
import { OrderData } from '../types';

// Utility function to format numbers with thousands separators
const formatNumber = (value: string | undefined, columnName: string): string => {
  if (!value || value === '-' || value.trim() === '') {
    return '-';
  }
  
  // Remove any existing commas and whitespace
  const cleanValue = value.replace(/,/g, '').trim();
  
  // Check if it's a valid number
  const num = parseFloat(cleanValue);
  if (isNaN(num)) {
    return value; // Return original value if not a number
  }
  
  // Format based on column type
  if (isPriceColumn(columnName)) {
    // For price columns: up to 5 decimal places, no forced trailing zeros
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 5
    });
  } else {
    // For quantity columns: 0-2 decimal places
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }
};

// Helper function to check if a column should be formatted as a number
const isNumericColumn = (column: string): boolean => {
  return ['Order.QTY', 'Order.Price', 'Done Quantity', 'Done Price'].includes(column);
};

// Helper function to check if a column is a price column (needs up to 5 decimal places)
const isPriceColumn = (column: string): boolean => {
  return ['Order.Price', 'Done Price'].includes(column);
};

interface OrderTableProps {
  orderData: OrderData;
}

const OrderTable: React.FC<OrderTableProps> = ({ orderData }) => {
  const columns = [
    'DR Code',
    'Client Code',
    'Omnibus/GK Acc No',
    'Order Date',
    'GTD EXPIRY DATE',
    'B/S',
    'Market',
    'Instrument Code',
    'Securities/Stock Name',
    'Order.QTY',
    'Order.Price',
    'Status',
    'Done Quantity',
    'Done Price'
  ];
  
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} className={
                column === 'Done Price' || column === 'Done Quantity'
                  ? "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider bg-gray-100 border-b border-gray-300"
                  : "table-header"
              } style={
                column === 'Done Price' || column === 'Done Quantity'
                  ? { backgroundColor: '#F4AB6A', color: 'black' }
                  : undefined
              }>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            {columns.map((column) => (
              <td key={column} className="table-cell">
                <div className="text-gray-900 font-medium">
                  {isNumericColumn(column) 
                    ? formatNumber(orderData[column as keyof OrderData], column) 
                    : (orderData[column as keyof OrderData] || '-')
                  }
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;