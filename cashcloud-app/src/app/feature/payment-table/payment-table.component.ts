import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { PaymentActionsSummaryComponent } from '../payment-actions-summary/payment-actions-summary.component';

interface Payment {
  id: string;
  type: string;
  payee: string;
  address: string;
  amount: string;
  status: string;
  statusClass: string;
  date: string;
  destination: string;
}


@Component({
  selector: 'app-payment-table',
  standalone: true,
   imports: [
    TableModule,
    ButtonModule,
    CheckboxModule,
    NgClass,
    PaymentActionsSummaryComponent
  ],
  templateUrl: './payment-table.component.html',
  styleUrl: './payment-table.component.css'
})
export class PaymentTableComponent implements OnInit {
payments: Payment[] = [];

  constructor() { }

  ngOnInit(): void {
    this.payments = [
      {
        id: '000020',
        type: 'Check',
        payee: 'Miami Dade Tax...',
        address: 'Park ave 123 una dirección larga',
        amount: '$99,999.00',
        status: 'Pending Approval',
        statusClass: 'status-pending-approval',
        date: '01/07/2025',
        destination: 'Brother HL-L2360W'
      },
      {
        id: '000020',
        type: 'Check',
        payee: 'Miami Dade Tax...',
        address: 'Park ave 123 una dirección larga',
        amount: '$99,999.00',
        status: 'Pending Approval',
        statusClass: 'status-pending-approval',
        date: '01/07/2025',
        destination: 'Brother HL-L2360W'
      },
      {
        id: '000020',
        type: 'Check',
        payee: 'Miami Dade Tax...',
        address: 'Park ave 123 una dirección larga',
        amount: '$99,999.00',
        status: 'Pending Approval',
        statusClass: 'status-pending-approval',
        date: '01/07/2025',
        destination: 'Brother HL-L2360W'
      },
      {
        id: '000020',
        type: 'Check',
        payee: 'Miami Dade Tax...',
        address: 'Park ave 123 una dirección larga',
        amount: '$99,999.00',
        status: 'Pending Approval',
        statusClass: 'status-pending-approval',
        date: '01/07/2025',
        destination: 'Brother HL-L2360W'
      },
      {
        id: '000020',
        type: 'Check',
        payee: 'Miami Dade Tax...',
        address: 'Park ave 123 una dirección larga',
        amount: '$99,999.00',
        status: 'Pending Approval',
        statusClass: 'status-pending-approval',
        date: '01/07/2025',
        destination: 'Brother HL-L2360W'
      },
      {
        id: '000020',
        type: 'Check',
        payee: 'Miami Dade Tax...',
        address: 'Park ave 123 una dirección larga',
        amount: '$99,999.00',
        status: 'Pending Approval',
        statusClass: 'status-pending-approval',
        date: '01/07/2025',
        destination: 'Brother HL-L2360W'
      },
      {
        id: '000020',
        type: 'Check',
        payee: 'Miami Dade Tax...',
        address: 'Park ave 123 una dirección larga',
        amount: '$99,999.00',
        status: 'Pending Approval',
        statusClass: 'status-pending-approval',
        date: '01/07/2025',
        destination: 'Brother HL-L2360W'
      },
      {
        id: '000020',
        type: 'Check',
        payee: 'Miami Dade Tax...',
        address: 'Park ave 123 una dirección larga',
        amount: '$99,999.00',
        status: 'Pending Approval',
        statusClass: 'status-pending-approval',
        date: '01/07/2025',
        destination: 'Brother HL-L2360W'
      },
      {
        id: '000020',
        type: 'Check',
        payee: 'Miami Dade Tax...',
        address: 'Park ave 123 una dirección larga',
        amount: '$99,999.00',
        status: 'Pending Approval',
        statusClass: 'status-pending-approval',
        date: '01/07/2025',
        destination: 'Brother HL-L2360W'
      },
      {
        id: '000020',
        type: 'Check',
        payee: 'Miami Dade Tax...',
        address: 'Park ave 123 una dirección larga',
        amount: '$99,999.00',
        status: 'Pending Approval',
        statusClass: 'status-pending-approval',
        date: '01/07/2025',
        destination: 'Brother HL-L2360W'
      }
    ];
  }
}
