// transaction.service.interface.ts
import { Observable } from 'rxjs';
import { Payment } from '../models/transaction.model';
import { InjectionToken } from '@angular/core';

export const TRANSACTION_SERVICE = new InjectionToken<ITransactionService>('transaction-service');

export interface ITransactionService {
  getTransactions(): Observable<any[]>;
  mapToPayment(transaction: any): Payment;
}
