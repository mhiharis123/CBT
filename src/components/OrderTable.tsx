import React from 'react';
import { OrderData } from '../types';

interface OrderTableProps {
  orderData: OrderData;
}

const OrderTable: React.FC<OrderTableProps> = ({ orderData }) => {
  const columns = [
    'DR Code',
    'Client Code',
    '(Local)',
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
  ] as const;

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} className="table-header">
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
                  {orderData[column] || '-'}
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