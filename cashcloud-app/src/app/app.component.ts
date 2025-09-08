import { TransactionServiceTsService } from './core/services/transaction.service.ts.service';
import { Payment, Transaction} from './core/models/transaction.model';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PaymentSummaryCardComponent } from './shared/payment-summary-card/payment-summary-card.component';
import { PaymentTableComponent } from './feature/payment-table/payment-table.component';
import { type } from './core/enums/transactionType';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    TableModule,
    PaymentSummaryCardComponent,
    PaymentTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  private transactionServiceTsService = inject(TransactionServiceTsService)

  title = 'No. of Payments:';
  batch = 'Batch #13';
  payorName = signal<string>('');
  transactions = signal<Transaction[]>([]);
  payments = signal<Payment[]>([]);
  batchId = signal<string>('');
  currentTab = signal<string>('view');
  isDarkMode = signal(false);

  filterVisible = false;
  totalPayments = computed(() => this.transactions().length);
  checkPayments = computed(() => this.transactions().filter(t => t.type === type.Check).length);
  achPayments = computed(() => this.transactions().filter(t => t.type === type.ACH_EFT).length);
  digitalCheckPayments = computed(() => this.transactions().filter(t => t.type === type.Digital_Check).length);

  totalBatchAmount = computed(() => this.transactions().reduce((sum, t) => sum + parseFloat(t.amount.replace('$', '').replace(',', '')), 0));
  totalCheckAmount = computed(() => this.transactions().filter(t => t.type === type.Check).reduce((sum, t) => sum + parseFloat(t.amount.replace('$', '').replace(',', '')), 0));
  totalAchAmount = computed(() => this.transactions().filter(t => t.type === type.ACH_EFT).reduce((sum, t) => sum + parseFloat(t.amount.replace('$', '').replace(',', '')), 0));
  totalDigitalCheckAmount = computed(() => this.transactions().filter(t => t.type === type.Digital_Check).reduce((sum, t) => sum + parseFloat(t.amount.replace('$', '').replace(',', '')), 0));

  ngOnInit(): void {
    this.transactionServiceTsService.getTransactions().subscribe({
      next: (data) => {
        this.transactions.set(data);
        if (data.length > 0) {
          this.payorName.set(data[0].transaction_bank_account?.account_payor?.payorName || 'N/A');
        }
        const paymentsMapped = data.map(item => this.transactionServiceTsService.mapToPayment(item));
        this.payments.set(paymentsMapped);
      },
      error: (err) => console.error('Error al obtener transacciones:', err)
    });
  }

  toggleDarkMode() {
    this.isDarkMode.update(value => !value);
    if (this.isDarkMode()) {
      document.documentElement.classList.add('app-dark');
    } else {
      document.documentElement.classList.remove('app-dark');
    }
  }
}
