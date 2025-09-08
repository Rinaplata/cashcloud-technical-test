import { effect, Injectable, signal } from '@angular/core';
import { Payment, Transaction } from '../models/transaction.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentStatus } from '../enums/paymentStatus';

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceTsService {
   private apiUrl = '../../../assets/seed.json';

  constructor(private http: HttpClient) { }

  public getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  public mapToPayment(item: Transaction): Payment {
    return {
      id: item.displayId,
      type: item.type,
      payee: item.transaction_payee?.payeeFullName || '',
      address: item.transaction_payee?.mailing_address?.address || '',
      amount: parseFloat(item.amount.replace('$', '').replace(',', '')),
      status: item.status,
      date: item.date,
      destination: item.transaction_printer?.printerName || ''
    };
  }

  private mapStatus(status: string): PaymentStatus {
    switch (status) {
      case 'Pending Approval':
        return PaymentStatus.PendingApproval;
      case 'Pending Signature':
        return PaymentStatus.PendingDigitalSignature;
      case 'Disbursement':
        return PaymentStatus.PendingDisbursement;
      case 'Completed':
        return PaymentStatus.Completed;
      case 'Rejected':
        return PaymentStatus.Rejected;
      case 'Reprinted':
        return PaymentStatus.Reprinted;
      case 'Approved':
        return PaymentStatus.Approved;
      default:
        return PaymentStatus.PendingResponse;
    }
  }

}
