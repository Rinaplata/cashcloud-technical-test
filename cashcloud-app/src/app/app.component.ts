import { Transaction } from './core/models/transaction.model';
import { CommonModule, NgLocalization } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { StatusBadgeComponent } from './shared/status-badge/status-badge.component';
import { PaymentStatus } from './core/enums/paymentStatus';
import { PaymentSummaryCardComponent } from './shared/payment-summary-card/payment-summary-card.component';
import { PaymentActionsSummaryComponent } from './feature/payment-actions-summary/payment-actions-summary.component';
import { ButtonModule } from 'primeng/button';
import { FilterModalComponent } from './feature/filter-modal.component/filter-modal.component';
import { TransactionServiceTsService } from './core/services/transaction.service.ts.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    StatusBadgeComponent,
    PaymentSummaryCardComponent,
    PaymentActionsSummaryComponent,
    ButtonModule,
    FilterModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  transactions: Transaction[] = [];
  loading = true;
  private transactionService = inject(TransactionServiceTsService);

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.loading = false;
        console.log('Datos cargados:', this.transactions);
      },
      error: (err) => {
        console.error('Error al obtener las transacciones:', err);
        this.loading = false;
      }
    });
  }

  PaymentStatus = PaymentStatus;
  title = 'No. of Payments:';

  filterVisible = false;

  handleFilter(filters: any) {
    console.log('Filtros aplicados:', filters);
  }
}
