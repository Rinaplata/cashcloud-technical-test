import { TransactionServiceTsService } from './../../core/services/transaction.service.ts.service';
import { Component, computed, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { NgClass } from '@angular/common';
import { PaymentActionsSummaryComponent } from '../payment-actions-summary/payment-actions-summary.component';
import { PaymentStatus } from '../../core/enums/paymentStatus';
import { toSignal } from '@angular/core/rxjs-interop';
import { Transaction } from '../../core/models/transaction.model';
import { map, tap } from 'rxjs';
import { StatusBadgeComponent } from "../../shared/status-badge/status-badge.component";

interface Payment {
  id: string;
  type: string;
  payee: string;
  address: string;
  amount: string;
  status: string;
  statusClass: string;
  date: string;
  destination: string;
}


@Component({
  selector: 'app-payment-table',
  standalone: true,
   imports: [
    TableModule,
    ButtonModule,
    CheckboxModule,
    PaymentActionsSummaryComponent,
    StatusBadgeComponent
],
  templateUrl: './payment-table.component.html',
  styleUrl: './payment-table.component.css'
})
export class PaymentTableComponent {
  PaymentStatus = PaymentStatus;
  @ViewChildren('colHeader')
  colHeaders!: QueryList<any>;
  columnCount: number = 0;

    ngAfterViewInit(): void {
    this.columnCount = this.colHeaders.length;
  }

  private transactionService = inject(TransactionServiceTsService);

  payments = toSignal(this.transactionService.getTransactions().pipe(
    map((transactions: Transaction[]) => transactions.map((item: Transaction) => ({
      id: item.displayId,
      type: item.type,
      payee: item.transaction_payee?.payeeFullName,
      address: item.transaction_payee?.mailing_address?.address,
      amount: item.amount,
      status: this.mapStatus(item.status),
      date: item.date,
      destination: item.transaction_printer?.printerName
    }))),
    tap(mappedData => {
      console.log('Datos mapeados para la tabla:', mappedData);
    })
  ), { initialValue: [] });

    totalPayments = computed(() => this.payments().filter(p=> p.status == PaymentStatus.Approved).length);

  mapStatus(status: string): PaymentStatus {
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
