# Cross Border Trade Order Formatter

A React web application for formatting Cross Border Trade order details into clean, professional tables.

## Features

- **Order Input**: Paste CSV-formatted order details in a single input field
- **Formatted Output**: Displays selected columns in a clean table format
- **Error Handling**: Validates input data and shows helpful error messages
- **Professional Styling**: Uses Tailwind CSS for a clean, financial-industry appearance
- **Responsive Design**: Works on desktop and mobile devices
- **Disclaimer Text**: Includes required legal disclaimer below formatted tables

## Required Output Columns

The application displays the following columns in order:
- DR Code
- Client Code
- (Local)
- Omnibus/GK Acc No
- Order Date
- GTD EXPIRY DATE
- B/S
- Market
- Instrument Code
- Securities/Stock Name
- Order.QTY
- Order.Price
- Status
- Done Quantity
- Done Price

## Usage

1. **Start the Application**:
   ```bash
   npm install
   npm start
   ```

2. **Input Format**: Copy a row from your CSV file in this format:
   ```
   1,Day,CSY,255048,68380,11/08/2025,29/08/2025,SELL,LSE,PALMP.L,PANTHER METALS,4000,100P,Haris,Joseph,,,
   ```

3. **Processing**: Paste the data into the input field and click "Format Order"

4. **Output**: View the formatted table with only the required columns

## Example Input

From OrderList.csv row 5 (T60 order):
```
5,Day,T60,204112,68380,25/08/2025,,SELL,HKEX,9988.HK,BABA-SW,40,MKT,Dinie,Jonathan,Done,, 40 ,120.50
```

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Scripts** for build tooling
- **CSV Parsing** with custom parser

## Development

- Development server runs on `http://localhost:3001`
- Build production version with `npm run build`
- All source files are in `/src` directory

## File Structure

```
src/
├── App.tsx                 # Main application component
├── components/
│   ├── OrderInput.tsx      # Input form component
│   ├── OrderTable.tsx      # Table display component
│   ├── DisclaimerText.tsx  # Legal disclaimer component
│   └── ErrorDisplay.tsx    # Error message component
├── utils/
│   └── csvParser.ts        # CSV parsing and validation logic
└── types.ts                # TypeScript type definitions
```

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Serve the build folder using a static server:
   ```bash
   npm install -g serve
   serve -s build
   ```