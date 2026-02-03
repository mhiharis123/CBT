# Cross Border Trade Order Formatter

A React web application for formatting Cross Border Trade order details into clean, professional email-ready tables with HTML output capabilities.

## Features

- **Multiple Order Processing**: Input multiple CSV rows at once - new orders are appended to existing ones
- **Email-Ready Output**: Generates HTML tables formatted for email clients with proper styling
- **Dual View Modes**: Switch between visual preview and HTML code view
- **Number Formatting**: Automatic thousands separators for quantities and prices (up to 5 decimal places for prices)
- **One-Click Copy**: Copy formatted content with styling preserved or HTML code directly
- **Error Handling**: Validates input data and shows helpful error messages
- **Professional Styling**: Uses Tailwind CSS for a clean, financial-industry appearance
- **Responsive Design**: Works on desktop and mobile devices
- **Legal Disclaimer**: Includes required compliance disclaimer with settlement instructions

## Required Output Columns

The application displays the following columns in order:
- DR Code
- Client Code
- Omnibus/GK Acc No
- Order Date
- GTD EXPIRY DATE
- B/S
- Market
- Instrument Code
- Securities/Stock Name
- Order.QTY (formatted with thousands separators)
- Order.Price (formatted with thousands separators, up to 5 decimal places)
- Status
- Done Quantity (formatted with thousands separators, highlighted in orange)
- Done Price (formatted with thousands separators, up to 5 decimal places, highlighted in orange)
- Settlement Currency (highlighted in orange)

## Usage

1. **Start the Application**:
   ```bash
   npm install
   npm start
   ```
   The application runs on `http://localhost:3004`

2. **Input Format**: Copy one or more rows from your CSV file. Each row should be in this format:
   ```
   7	Day	T92	253983	68380	3-Feb-2026		BUY	ASX	WC8.AX	WILDCAT RESOURCES	191,600	AUD 0.385	Dinie	Kok Hian	Done	Revise from AUD 0.375 to AUD 0.385	191,600	AUD 0.384972	MYR
   ```

3. **Processing**: 
   - Paste the data into the input field
   - Click "Process Orders" to add them to your table
   - Multiple submissions will append new orders to existing ones
   - Use "Clear All Orders" to start fresh

4. **Output Options**:
   - **Preview Mode**: See how your email will look with formatted tables
   - **HTML Code Mode**: View and copy the raw HTML code
   - **Copy Functions**: Copy with formatting preserved or copy HTML code

## Key Features Detail

### Email Output Capabilities
- **HTML Table Generation**: Creates properly formatted HTML tables suitable for email clients
- **Styled Headers**: Done Price/Qty and Settlement Currency columns highlighted with orange background (#F4AB6A)
- **Formatted Numbers**: Automatic formatting with thousands separators
- **Built-in Disclaimer**: Compliance text with settlement instructions and contact details

### Copy Options
- **Formatted Copy**: Preserves HTML styling when pasted into email clients
- **HTML Code Copy**: Raw HTML code for manual integration
- **Visual Feedback**: Success notifications with copy confirmations

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Scripts** for build tooling
- **Custom CSV Parser** with multi-line support
- **Browser Clipboard API** for enhanced copy functionality

## Development

- Development server runs on `http://localhost:3004`
- Build production version with `npm run build`
- All source files are in `/src` directory

## File Structure

```
src/
├── App.tsx                 # Main application component with order management
├── components/
│   ├── OrderInput.tsx      # CSV input form with validation
│   ├── EmailOutput.tsx     # Email-ready HTML table generator
│   ├── DisclaimerText.tsx  # Legal disclaimer component
│   └── ErrorDisplay.tsx    # Error message display
├── utils/
│   └── csvParser.ts        # Multi-line CSV parsing and validation
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