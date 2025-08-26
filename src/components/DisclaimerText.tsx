import React from 'react';

const DisclaimerText: React.FC = () => {
  return (
    <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
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
        
        <div className="border-t border-amber-300 pt-4">
          <h4 className="font-semibold text-red-700 mb-2">IMPORTANT NOTE:</h4>
          <p className="text-sm">
            All the Offline Cross Border Trade settlement DEFAULT in MYR, DRs/Remisiers <strong>MUST NOTIFY</strong> CGS I'ntl SEC MY OPS-CROSS BORDER SETTLEMENT{' '}
            <a href="mailto:opssett.my@cgsi.com" className="text-blue-600 underline">
              (opssett.my@cgsi.com)
            </a>{' '}
            by <strong>T+1 BEFORE 11:30AM</strong>, if your client wishes to maintain the settlement in traded currency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerText;