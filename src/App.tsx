import React, { useState } from 'react';
import OrderInput from './components/OrderInput';
import EmailOutput from './components/EmailOutput';
import ErrorDisplay from './components/ErrorDisplay';
import { OrderData } from './types';
import { parseMultipleCSVLines } from './utils/csvParser';

function App() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOrderSubmit = (csvData: string) => {
    setIsLoading(true);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      const parsedData = parseMultipleCSVLines(csvData);
      
      if (parsedData.isValid) {
        // Append new orders to existing ones
        setOrders(prevOrders => [...prevOrders, ...parsedData.orders]);
        setErrors(null);
      } else {
        setErrors(parsedData.errors || ['Unknown error occurred']);
      }
      
      setIsLoading(false);
    }, 300);
  };

  const handleClearOrders = () => {
    setOrders([]);
    setErrors(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Cross Border Trade Order Formatter
            </h1>
            <p className="mt-2 text-gray-600">
              Format your order details into a clean, professional table
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Input Section */}
          <OrderInput onSubmit={handleOrderSubmit} isLoading={isLoading} />

          {/* Results Section */}
          {(orders.length > 0 || errors) && (
            <div className="space-y-6">
              {errors && (
                <ErrorDisplay errors={errors} />
              )}

              {orders.length > 0 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      {orders.length} order{orders.length > 1 ? 's' : ''} ready to copy
                    </p>
                    <button
                      onClick={handleClearOrders}
                      className="px-4 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                    >
                      Clear All Orders
                    </button>
                  </div>
                  <EmailOutput orders={orders} />
                </div>
              )}
            </div>
          )}

          {/* Sample Data Helper */}
          {orders.length === 0 && !errors && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-3">
                Sample Format
              </h3>
              <p className="text-blue-800 mb-3">
                Copy one or more rows from your CSV file in this format:
              </p>
              <code className="block bg-blue-100 p-3 rounded text-sm text-blue-900 overflow-x-auto">
                4    Day    BG7    19076    68380    25/08/2025    29/08/2025    SELL    ASX    ALK.AX    Alkane Resources Ltd    2000    0.985    Aizat    Sean    Done        22,000    0.985
              </code>
              <p className="text-blue-700 text-sm mt-2">
                The system will automatically extract the required columns and format them into a professional table. Multiple rows will be appended to the existing table.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            CBT Order Formatter - Cross Border Trade Processing Tool
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;