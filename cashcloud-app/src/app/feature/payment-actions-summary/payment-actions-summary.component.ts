import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

interface Payment {
  id: string;
  type: string;
  payee: string;
  address: string;
  amount: number;
  status: string;
  date: string;
  destination: string;
}

@Component({
  selector: 'app-payment-actions-summary',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './payment-actions-summary.component.html',
  styleUrl: './payment-actions-summary.component.css'
})
export class PaymentActionsSummaryComponent {
  @Input() payments: Payment[] = [];
  dropdownOpen: boolean = false;
  @Output() filteredPayments = new EventEmitter<Payment[]>();
  @Output() tabChanged = new EventEmitter<string>();

  activeTab: string = 'approve';

  tabs = [
    {
      key: 'all',
      label: 'View All',
      icon: 'pi pi-compass',
      ariaLabel: 'View All'
    },
    {
      key: 'approve',
      label: 'Approve',
      icon: 'pi pi-check',
      ariaLabel: 'Approve'
    },
    {
      key: 'sign',
      label: 'Sign',
      icon: 'pi pi-pencil',
      ariaLabel: 'Sign',
      isWarning: true
    },
    {
      key: 'disburse',
      label: 'Disburse',
      icon: 'pi pi-play',
      ariaLabel: 'Disburse',
      isWarning: true
    },
    {
      key: 'processing',
      label: 'Processing',
      icon: 'pi pi-refresh',
      ariaLabel: 'Processing'
    },
    {
      key: 'completed',
      label: 'Completed',
      icon: 'pi pi-clone',
      ariaLabel: 'Completed'
    }
  ];

  moreActions = [
    { label: 'Rejected', command: () => this.setActiveTab('rejected') },
    { label: 'Returned', command: () => this.setActiveTab('returned') }
  ];

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.tabChanged.emit(tab);
  }

  getTotal(status: string): number {
    if (status === 'all') return this.payments.length;
    if (status === 'more') return this.getMoreStatusesCount();
    return this.payments.filter(p => p.status.toLowerCase() === status).length;
  }

  private getMoreStatusesCount(): number {
    const extraStatuses = ['rejected', 'returned'];
    return this.payments.filter(p => extraStatuses.includes(p.status.toLowerCase())).length;
  }

  toggleDropdown(): void {
  this.dropdownOpen = !this.dropdownOpen;
}
}
