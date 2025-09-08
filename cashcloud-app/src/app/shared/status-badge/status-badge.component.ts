import { Component, Input, signal } from '@angular/core';
import { PaymentStatus } from '../../core/enums/paymentStatus';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [NgClass],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css',
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: PaymentStatus;

  getClassStatus(status: PaymentStatus): string {
    switch (status) {
      case PaymentStatus.PendingApproval:
      case PaymentStatus.Processing:
      case PaymentStatus.PendingResponse:
      case PaymentStatus.Approved:
        return 'badge-pending-approval';

      case PaymentStatus.PendingDigitalSignature:
        return 'badge-pending-signature';

      case PaymentStatus.PendingDisbursement:
      case PaymentStatus.Pending:
        return 'badge-disbursement';

      case PaymentStatus.Completed:
      case PaymentStatus.Mailed:
      case PaymentStatus.Printed:
      case PaymentStatus.Signed:
        return 'badge-completed';

      case PaymentStatus.Rejected:
      case PaymentStatus.Voided:
      case PaymentStatus.Canceled:
        return 'badge-rejected';

      case PaymentStatus.Reprinted:
        return 'badge-reprinted';

      default:
        return 'badge-default';
    }
  }
}
