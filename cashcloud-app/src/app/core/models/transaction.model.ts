export interface Address {
  address: string;
  idPayeeAddress: string;
  addressLine1: string;
  addressLine2: string | null;
  addressLine3: string | null;
  addressLine4: string | null;
  city: string;
  state: string;
  country: string | null;
  countryCode: string | null;
  zipCode: string;
}

export interface Payee {
  payeeFullName: string;
  name: string;
  name2: string | null;
  payeeAccountNumber: string | null;
  payeeRoutingNumber: string | null;
  mailing_address: Address;
}

export interface BankAccount {
  shortAccountNumber: string;
  shortRoutingNumber: string;
  idAccount: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  payorId: string;
  optionalCode: string;
  account_payor: {
    idPayor: string;
    payorName: string;
    externalPayorId: string | null;
  };
}

export interface Printer {
  idPrinter: string;
  printerName: string;
  location: string;
}

export interface Transaction {
  displayId: string;
  idTransaction: string;
  transactionIdCompany: string;
  checkNumber: string;
  amount: string;
  bankAccountId: string;
  type: 'Digital Check' | 'ACH/EFT';
  signaturesRequired: number;
  signatureStatus: string;
  date: string;
  createdAt: string;
  status: 'Approved' | 'Pending' | 'Denied' | 'Voided';
  transactionPrinted: boolean;
  printerId: string;
  reprintPrinterId: string;
  batchId: string;
  transaction_payee: Payee;
  transaction_bank_account: BankAccount;
  transaction_printer: Printer;
  transaction_reprint_printer: Printer;
}
