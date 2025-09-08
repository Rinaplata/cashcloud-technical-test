import { Component, Input} from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-payment-summary-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './payment-summary-card.component.html',
  styleUrl: './payment-summary-card.component.css'
})
export class PaymentSummaryCardComponent {
  @Input() title!: string;
  @Input() totalPayments!: number;
  @Input() checks!: number;
  @Input() ach!: number;
  @Input() digitalChecks!: number;
}
