import React, { useState } from 'react';

interface OrderInputProps {
  onSubmit: (csvData: string) => void;
  isLoading?: boolean;
}

const OrderInput: React.FC<OrderInputProps> = ({ onSubmit, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Paste Order Details
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Copy and paste one or more rows of order details from your CSV file. Multiple rows will be appended to the existing table.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="order-input" className="block text-sm font-medium text-gray-700 mb-2">
            Order Data (CSV Format)
          </label>
          <textarea
            id="order-input"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-vertical"
            placeholder="Example (multiple lines supported):
15    Day    H25    139188    68380    29/08/2025    -    SELL    HKEX    8210.HK    DLC ASIA LIMITED    240.000    0.052    Dinie    Joseph    Partial Done    220.000    0.052091
14    Day    G07    104833    68380    29/08/2025    -    BUY    ASX    HCT.AX    HOLISTA COLLTECH LIMITED    10.000    0.110    Dinie    Jonathan    Done    10.000    0.110"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="px-6 py-2 bg-primary-600 text-white font-medium rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Processing...' : 'Add Orders'}
          </button>
          
          <button
            type="button"
            onClick={handleClear}
            disabled={!inputValue.trim() || isLoading}
            className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderInput;