import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StatusBadgeComponent } from './shared/status-badge/status-badge.component';
import { PaymentStatus } from './core/enums/paymentStatus';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  PaymentStatus = PaymentStatus;
}
