import React from 'react';

const DisclaimerText: React.FC = () => {
  return (
    <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
      <div className="prose prose-sm max-w-none text-gray-800">
        <p className="mb-4">
          Kindly check for any discrepancy in this trade confirmation against the order and phone confirmation.
          It is a <strong>MUST</strong> to revert to us by the end of the trading day.
        </p>
        <p className="mb-4">
          Any error in trade (EIT) or disputes reported after the trade date will not be entertained.
          Please note that we will not be liable to the error because this is a price sensitive issue here.
        </p>
        <p className="mb-6">
          Thank you for your kind understanding.
        </p>

        <div className="border-t border-red-300 pt-4">
          <h4 className="font-semibold text-red-700 mb-2">IMPORTANT NOTE:</h4>
          <div className="text-sm space-y-1">
            <p>1) All Offline Cross Border Trade settlement will be in MYR by default.</p>
            <p>2) DR must ensure the settlement currency is correctly indicated based on client’s request at the point of order placement.</p>
            <p>3) NO amendments on settlement currency are allowed once the contract has been booked out.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerText;