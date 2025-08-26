import React, { useState } from 'react';
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

interface EmailOutputProps {
  orderData: OrderData;
}

const EmailOutput: React.FC<EmailOutputProps> = ({ orderData }) => {
  const [viewMode, setViewMode] = useState<'html' | 'preview'>('preview');
  const [showNotification, setShowNotification] = useState(false);
  const formatEmailContent = () => {
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

    // Create HTML table
    let tableHTML = `<table border="1" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
  <thead>
    <tr style="background-color: #f2f2f2;">`;
    
    // Add headers
    columns.forEach(column => {
      const headerStyle = (column === 'Done Price' || column === 'Done Quantity')
        ? "padding: 8px; text-align: left; border: 1px solid #ddd; background-color: #F4AB6A; color: black;"
        : "padding: 8px; text-align: left; border: 1px solid #ddd;";
      tableHTML += `
      <th style="${headerStyle}">${column}</th>`;
    });
    
    tableHTML += `
    </tr>
  </thead>
  <tbody>
    <tr>`;
    
    // Add data row
    columns.forEach(column => {
      const rawValue = orderData[column as keyof OrderData] || '-';
      const value = isNumericColumn(column) ? formatNumber(rawValue, column) : rawValue;
      tableHTML += `
      <td style="padding: 8px; border: 1px solid #ddd;">${value}</td>`;
    });
    
    tableHTML += `
    </tr>
  </tbody>
</table>

<br><br>`;
    
    // Add disclaimer text
    const disclaimerHTML = `<div style="background-color: #fef2f2; border: 2px solid #dc2626; padding: 15px; border-radius: 8px; font-family: Arial, sans-serif;">
  <p style="margin-bottom: 12px;">
    <strong>Kindly check for any discrepancy in this trade confirmation against the order and phone confirmation. 
    It is a MUST to revert to us by the end of the trading day.</strong>
  </p>
  
  <p style="margin-bottom: 12px;">
    Any error in trade (EIT) or disputes reported after the trade date will not be entertained. 
    Please note that we will not be liable to the error because this is a price sensitive issue here.
  </p>
  
  <p style="margin-bottom: 15px;">
    Thank you for your kind understanding.
  </p>
  
  <hr style="border: 1px solid #dc2626; margin: 15px 0;">
  
  <h4 style="color: #cc0000; margin-bottom: 8px;">IMPORTANT NOTE:</h4>
  <p style="font-size: 14px; margin: 0;">
    All the Offline Cross Border Trade settlement DEFAULT in MYR, DRs/Remisiers <strong>MUST NOTIFY</strong> 
    CGS I'ntl SEC MY OPS-CROSS BORDER SETTLEMENT 
    <a href="mailto:opssett.my@cgsi.com" style="color: #0066cc; text-decoration: underline;">(opssett.my@cgsi.com)</a> 
    by <strong>T+1 BEFORE 11:30AM</strong>, if your client wishes to maintain the settlement in traded currency.
  </p>
</div>`;

    return tableHTML + disclaimerHTML;
  };

  const emailContent = formatEmailContent();

  const handleCopyToClipboard = async () => {
    try {
      if (viewMode === 'html') {
        // Copy HTML code
        await navigator.clipboard.writeText(emailContent);
      } else {
        // Copy rendered content as HTML to clipboard so it pastes with formatting
        const blob = new Blob([emailContent], { type: 'text/html' });
        const clipboardItem = new ClipboardItem({ 'text/html': blob });
        await navigator.clipboard.write([clipboardItem]);
      }
      
      // Show notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback: copy as plain text
      try {
        await navigator.clipboard.writeText(emailContent);
        // Show notification even for fallback
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } catch (fallbackErr) {
        console.error('Fallback copy also failed: ', fallbackErr);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-none">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Email Draft - Ready to Copy
        </h2>
        <div className="flex gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'preview'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setViewMode('html')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'html'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              HTML Code
            </button>
          </div>
          <button
            onClick={handleCopyToClipboard}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {viewMode === 'html' ? 'Copy HTML Code' : 'Copy Formatted Content'}
          </button>
        </div>
      </div>
      
      {viewMode === 'html' ? (
        <textarea
          value={emailContent}
          readOnly
          className="w-full h-[600px] p-4 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your formatted email content will appear here..."
        />
      ) : (
        <div 
          className="w-full h-[600px] p-4 border border-gray-300 rounded-md bg-white overflow-auto cursor-text select-text"
          style={{ userSelect: 'text' }}
          onClick={() => {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(document.querySelector('.preview-content')!);
            selection?.removeAllRanges();
            selection?.addRange(range);
          }}
        >
          <div 
            className="preview-content" 
            dangerouslySetInnerHTML={{ __html: emailContent }} 
            style={{ userSelect: 'text' }}
          />
        </div>
      )}
      
      <p className="mt-2 text-sm text-gray-600">
        {viewMode === 'html' 
          ? 'This is the HTML code. Use the Copy button above or select and copy the text manually.'
          : 'This shows how your email will look. Click anywhere to select content, or use the Copy button to copy with formatting.'
        }
      </p>
      
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Copied to Clipboard!</span>
        </div>
      )}
    </div>
  );
};

export default EmailOutput;