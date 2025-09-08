import { ITransactionService, TRANSACTION_SERVICE } from './../../core/services/Itransaction.service.ts.service';
import { Component, Output, EventEmitter, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './payment-actions-summary.component.css',
  providers: [
    { provide: TRANSACTION_SERVICE, useClass: TransactionServiceTsService }
  ],
})
export class PaymentActionsSummaryComponent {
  private transactionService = inject(TRANSACTION_SERVICE);
  allPayments = toSignal(
    this.transactionService.getTransactions().pipe(
      map(transactions => transactions.map(t => this.transactionService.mapToPayment(t)))
    ),
    { initialValue: [] }
  );

  @Output() tabSelected = new EventEmitter<string>();
  activeTab = signal<string>('all');
  activeMoreTab = signal<string | null>(null);
  filteredPayments = signal<Payment[]>([]);

  statusTotals = computed(() => {
    const counts: Record<string, number> = {
      all: this.allPayments().length,
      approve: this.allPayments().filter(p => p.status == PaymentStatus.Approved).length,
      sign: this.allPayments().filter(p => p.status == PaymentStatus.Signed).length,
      disburse: this.allPayments().filter(p => p.status == PaymentStatus.PendingDisbursement).length,
      processing: this.allPayments().filter(p => p.status == PaymentStatus.Processing).length,
      pendingResponse: this.allPayments().filter(p => p.status == PaymentStatus.PendingResponse).length,
      completed: this.allPayments().filter(p => p.status == PaymentStatus.Completed).length,
      rejected: this.allPayments().filter(p => p.status == PaymentStatus.Rejected).length,
      pending: this.allPayments().filter(p => p.status == PaymentStatus.Pending).length,
      canceled: this.allPayments().filter(p => p.status == PaymentStatus.Canceled).length,
      more: 0
    };

    counts['more'] = counts['rejected'] + counts['canceled'] + counts['pending'];
    return counts;
  });

  dropdownOpen = signal<boolean>(false);

  tabs = [
    { key: 'all', label: 'View All', icon: 'pi pi-compass', ariaLabel: 'View All' },
    { key: 'approve', label: 'Approve', icon: 'pi pi-check', ariaLabel: 'Approve' },
    { key: 'sign', label: 'Sign', icon: 'pi pi-pencil', ariaLabel: 'Sign', isWarning: true },
    { key: 'disburse', label: 'Disburse', icon: 'pi pi-play', ariaLabel: 'Disburse', isWarning: true },
    { key: 'processing', label: 'Processing', icon: 'pi pi-refresh', ariaLabel: 'Processing' },
    { key: 'completed', label: 'completed', icon: 'pi pi-clone', ariaLabel: 'Completed' }
  ];

  moreActions = [
    { key: 'rejected', label: 'Rejected', icon: 'pi pi-times-circle', total: this.statusTotals()['rejected'], isWarning: true },
    { key: 'pending', label: 'Pending', icon: 'pi pi-clock', total: this.statusTotals()['pending'], isWarning: false },
    { key: 'canceled', label: 'Canceled', icon: 'pi pi-ban', total: this.statusTotals()['canceled'], isWarning: true },
  ];

  isMoreTabActive = computed(() => {
    const activeKey = this.activeTab();
    return this.moreActions.some(action => action.key === activeKey);
  });

  activeMoreAction = computed(() => {
    const activeKey = this.activeTab();
    const action = this.moreActions.find(action => action.key === activeKey);
    return {...action, total: this.statusTotals()[activeKey] };
  });

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
    this.dropdownOpen.set(false);
    this.tabSelected.emit(tab);
  }

  selectMoreAction(key: string): void {
    this.setActiveTab(key);
  }

  getTotal(status: string): number {
    const totals = this.statusTotals();
    return totals[status] || 0;
  }

  toggleDropdown(): void {
    this.dropdownOpen.update(val => !val);
  }
}
