import { TransactionServiceTsService } from './../../core/services/transaction.service.ts.service';
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, inject, OnInit, QueryList, signal, ViewChildren } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PaymentActionsSummaryComponent } from '../payment-actions-summary/payment-actions-summary.component';
import { PaymentStatus } from '../../core/enums/paymentStatus';
import { toSignal } from '@angular/core/rxjs-interop';
import { Payment, Transaction } from '../../core/models/transaction.model';
import { map, tap } from 'rxjs';
import { StatusBadgeComponent } from "../../shared/status-badge/status-badge.component";
import { PaymentColumns } from '../../core/enums/paymentColumns';

/* interface Payment {
  id: string;
  type: string;
  payee: string;
  address: string;
  amount: string;
  status: string;
  statusClass: string;
  date: string;
  destination: string;
} */

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './payment-table.component.css'
})
export class PaymentTableComponent implements AfterViewInit, OnInit {
  private transactionService = inject(TransactionServiceTsService);
  PaymentStatus = PaymentStatus;
  @ViewChildren('colHeader')
  colHeaders!: QueryList<PaymentColumns>;
  columnCount = 0;

  ngAfterViewInit(): void {
    this.columnCount = this.colHeaders.length;
  }

  ngOnInit(): void {
    this.filterPaymentsByStatus('all');
  }


  /*   payments = toSignal(this.transactionService.getTransactions().pipe(
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
        this.filteredPayments.set(mappedData);
      })
    ), { initialValue: [] }); */

  payments = toSignal(
    this.transactionService.getTransactions().pipe(
      map(transactions => transactions.map(item => this.mapToPayment(item))),
      tap(mappedData => {
        this.filteredPayments.set(mappedData);
      })
    ),
    { initialValue: [] }
  );

  filteredPayments = signal<Payment[]>([]);
  totalPayments = computed(() => this.filteredPayments().length);
   currentFilterStatus = signal<string>('all');
  statusActual = computed(() => {
    switch (this.currentFilterStatus()) {
      case 'all': return 'All Payments';
      case 'approve': return 'Approve Payments';
      case 'sign': return 'Sign Payments';
      case 'disburse': return 'Disburse Payments';
      case 'processing': return 'Processing Payments';
      case 'completed': return 'Completed Payments';
      case 'rejected': return 'Rejected Payments';
      case 'pending': return 'Pending Payments';
      case 'pending Response': return 'Pending Response';
      case 'canceled': return 'Canceled Payments';
      default: return 'Approve Payments';
    }
  });

  private mapToPayment(item: Transaction): Payment {
    const status = this.mapStatus(item.status);
    return {
      id: item.displayId,
      type: item.type,
      payee: item.transaction_payee?.payeeFullName || '',
      address: item.transaction_payee?.mailing_address?.address || '',
      amount: parseFloat(item.amount.replace('$', '').replace(',', '')),
      status: status,
      date: item.date,
      destination: item.transaction_printer?.printerName || '',
    };
  }

private mapStatus(status: string): PaymentStatus {
  switch (status) {
    case 'Pending Approval':
      return PaymentStatus.PendingApproval;
    case 'Pending Digital Signature':
      return PaymentStatus.PendingDigitalSignature;
    case 'Pending Disbursement':
      return PaymentStatus.PendingDisbursement;
    case 'Processing':
      return PaymentStatus.Processing;
    case 'Printed':
      return PaymentStatus.Printed;
    case 'Completed':
      return PaymentStatus.Completed;
    case 'Mailed':
      return PaymentStatus.Mailed;
    case 'Rejected':
      return PaymentStatus.Rejected;
    case 'Voided':
      return PaymentStatus.Voided;
    case 'Canceled':
      return PaymentStatus.Canceled;
    case 'Pending Response':
      return PaymentStatus.PendingResponse;
    case 'Reprinted':
      return PaymentStatus.Reprinted;
    case 'Approved':
      return PaymentStatus.Approved;
    case 'Signed':
      return PaymentStatus.Signed;
    case 'Pending':
      return PaymentStatus.Pending;
    default:
      return PaymentStatus.Voided;
  }
}

  filterPaymentsByStatus(status: string): void {
    this.currentFilterStatus.set(status);
    let newFilteredPayments: Payment[] = [];
    if (status === 'all') {
      newFilteredPayments = this.payments();
    } else {
      const filterStatus = this.mapFilterStatus(status);
      newFilteredPayments = this.payments().filter(p => p.status === filterStatus);
    }
    this.filteredPayments.set(newFilteredPayments);
  }


mapFilterStatus(status: string): PaymentStatus {
  switch (status) {
    case 'approve':
      return PaymentStatus.Approved;
    case 'sign':
      return PaymentStatus.Signed;
    case 'disburse':
      return PaymentStatus.PendingDisbursement;
    case 'processing':
      return PaymentStatus.Processing;
    case 'completed':
      return PaymentStatus.Completed;
    case 'rejected':
      return PaymentStatus.Rejected;
    case 'pending':
      return PaymentStatus.Pending;
    case 'canceled':
      return PaymentStatus.Canceled;
    case 'reprinted':
      return PaymentStatus.Reprinted;
    default:
      return PaymentStatus.Voided;
  }
}

}
