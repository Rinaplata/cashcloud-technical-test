import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PaymentSummaryCardComponent } from './shared/payment-summary-card/payment-summary-card.component';
import { PaymentTableComponent } from './feature/payment-table/payment-table.component';


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
export class AppComponent {
  title = 'No. of Payments:';

  filterVisible = false;

  handleFilter(filters: any) {
    console.log('Filtros aplicados:', filters);
  }
}
