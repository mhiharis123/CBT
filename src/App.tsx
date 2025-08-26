import React, { useState } from 'react';
import OrderInput from './components/OrderInput';
import EmailOutput from './components/EmailOutput';
import ErrorDisplay from './components/ErrorDisplay';
import { ParsedOrderData } from './types';
import { parseCSVLine, formatTableData } from './utils/csvParser';

function App() {
  const [orderData, setOrderData] = useState<ParsedOrderData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOrderSubmit = (csvData: string) => {
    setIsLoading(true);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      const parsedData = parseCSVLine(csvData);
      
      if (parsedData.isValid) {
        const formattedData = formatTableData(parsedData);
        setOrderData({ ...formattedData, isValid: true });
      } else {
        setOrderData(parsedData);
      }
      
      setIsLoading(false);
    }, 300);
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
          {orderData && (
            <div className="space-y-6">
              {!orderData.isValid && orderData.errors && (
                <ErrorDisplay errors={orderData.errors} />
              )}

              {orderData.isValid && (
                <EmailOutput orderData={orderData} />
              )}
            </div>
          )}

          {/* Sample Data Helper */}
          {!orderData && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-3">
                Sample Format
              </h3>
              <p className="text-blue-800 mb-3">
                Copy a row from your CSV file in this format:
              </p>
              <code className="block bg-blue-100 p-3 rounded text-sm text-blue-900 overflow-x-auto">
                1,Day,CSY,255048,68380,11/08/2025,29/08/2025,SELL,LSE,PALMP.L,PANTHER METALS,4000,100P,Haris,Joseph,,,
              </code>
              <p className="text-blue-700 text-sm mt-2">
                The system will automatically extract the required columns and format them into a professional table.
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