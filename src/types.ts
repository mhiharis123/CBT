export interface OrderData {
  'DR Code': string;
  'Client Code': string;
  '(Local)': string;
  'Omnibus/GK Acc No': string;
  'Order Date': string;
  'GTD EXPIRY DATE': string;
  'B/S': string;
  'Market': string;
  'Instrument Code': string;
  'Securities/Stock Name': string;
  'Order.QTY': string;
  'Order.Price': string;
  'Status': string;
  'Done Quantity': string;
  'Done Price': string;
}

export interface ParsedOrderData extends OrderData {
  isValid: boolean;
  errors?: string[];
}