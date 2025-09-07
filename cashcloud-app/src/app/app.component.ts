import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StatusBadgeComponent } from './shared/status-badge/status-badge.component';
import { PaymentStatus } from './core/enums/paymentStatus';
import { PaymentSummaryCardComponent } from './shared/payment-summary-card/payment-summary-card.component';
import { PaymentActionsSummaryComponent } from './feature/payment-actions-summary/payment-actions-summary.component';
import { ButtonModule } from 'primeng/button';
import { FilterModalComponent } from './feature/filter-modal.component/filter-modal.component';

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
  PaymentStatus = PaymentStatus;
  title = 'No. of Payments:';

  filterVisible = false;

  handleFilter(filters: any) {
    console.log('Filtros aplicados:', filters);
  }
}
