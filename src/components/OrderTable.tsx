import React from 'react';
import { OrderData } from '../types';

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
                  {orderData[column as keyof OrderData] || '-'}
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