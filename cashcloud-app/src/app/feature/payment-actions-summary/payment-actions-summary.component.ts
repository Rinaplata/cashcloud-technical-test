import { Component, Input, Output, EventEmitter, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Payment } from '../../core/models/transaction.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { TransactionServiceTsService } from '../../core/services/transaction.service.ts.service';
import { map } from 'rxjs';
import { PaymentStatus } from '../../core/enums/paymentStatus';

@Component({
  selector: 'app-payment-actions-summary',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './payment-actions-summary.component.html',
  styleUrl: './payment-actions-summary.component.css'
})
export class PaymentActionsSummaryComponent {
  private transactionService = inject(TransactionServiceTsService);
  allPayments = toSignal(
    this.transactionService.getTransactions().pipe(
      map(transactions => transactions.map(t => this.transactionService.mapToPayment(t)))
    ),
    { initialValue: [] }
  );

  activeTab = signal<string>('all');
  filteredPayments = signal<Payment[]>([]);

  statusTotals = computed(() => {
    const counts: { [key: string]: number } = {
      all: this.allPayments().length,
      approve: this.allPayments().filter(p=> p.status == PaymentStatus.Approved).length,
      sign: this.allPayments().filter(p=> p.status == PaymentStatus.Signed).length,
      disburse: this.allPayments().filter(p=> p.status == PaymentStatus.PendingDisbursement).length,
      processing: this.allPayments().filter(p=> p.status == PaymentStatus.Processing).length,
      completed: this.allPayments().filter(p=> p.status == PaymentStatus.Completed).length,
      rejected: this.allPayments().filter(p=> p.status == PaymentStatus.Rejected).length,
      printed: this.allPayments().filter(p=> p.status == PaymentStatus.Printed).length,
      Pending: this.allPayments().filter(p=> p.status == PaymentStatus.Pending).length,
      more: 0
    };

    return counts;
  });

  dropdownOpen = signal<boolean>(false);

  tabs = [
    { key: 'all', label: 'View All', icon: 'pi pi-compass', ariaLabel: 'View All' },
    { key: 'approve', label: 'Approve', icon: 'pi pi-check', ariaLabel: 'Approve' },
    { key: 'sign', label: 'Sign', icon: 'pi pi-pencil', ariaLabel: 'Sign', isWarning: true },
    { key: 'disburse', label: 'Disburse', icon: 'pi pi-play', ariaLabel: 'Disburse', isWarning: true },
    { key: 'processing', label: 'Processing', icon: 'pi pi-refresh', ariaLabel: 'Processing' },
    { key: 'completed', label: 'completed', icon: 'pi pi-clone',  ariaLabel: 'Completed' }
  ];

  moreActions = [
    { label: 'Printed', command: () => this.setActiveTab('printed') },
    { label: 'Pending', command: () => this.setActiveTab('Pending') }
  ];

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
    let filtered: Payment[] = [];
    switch (tab) {
      case 'all':
        filtered = this.allPayments();
        break;
      case 'rejected':
        filtered = this.allPayments().filter(p => p.status.toLowerCase() === 'rejected');
        break;
      case 'returned':
        filtered = this.allPayments().filter(p => p.status.toLowerCase() === 'returned');
        break;
      default:
        const statusMap: { [key: string]: string } = {
          'approve': 'pending approval',
          'sign': 'pending signature',
          'disburse': 'disbursement',
          'processing': 'processing',
          'completed': 'completed',
        };
        const statusKey = statusMap[tab];
        if (statusKey) {
          filtered = this.allPayments().filter(p => p.status.toLowerCase() === statusKey);
        }
        break;
    }
    this.filteredPayments.set(filtered);
    this.dropdownOpen.set(false);
  }

  getTotal(status: string): number {
    const totals = this.statusTotals();
    return totals[status] || 0;
  }

  toggleDropdown(): void {
    this.dropdownOpen.update(val => !val);
  }
}
