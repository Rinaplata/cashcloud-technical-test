import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PaymentActionsSummaryComponent } from './payment-actions-summary.component';
import { ITransactionService, TRANSACTION_SERVICE } from '../../core/services/Itransaction.service.ts.service';
import { PaymentStatus } from '../../core/enums/paymentStatus';
import { Payment } from '../../core/models/transaction.model';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

const mockPayments: Payment[] = [
  { id: '1', status: PaymentStatus.Approved } as Payment,
  { id: '2', status: PaymentStatus.Signed } as Payment,
  { id: '3', status: PaymentStatus.Pending } as Payment,
  { id: '4', status: PaymentStatus.Rejected } as Payment,
  { id: '5', status: PaymentStatus.PendingDisbursement } as Payment,
  { id: '6', status: PaymentStatus.Processing } as Payment,
  { id: '7', status: PaymentStatus.PendingResponse } as Payment,
  { id: '8', status: PaymentStatus.Completed } as Payment,
  { id: '9', status: PaymentStatus.Canceled } as Payment,
];

class MockTransactionService implements ITransactionService {
  getTransactions = jasmine.createSpy('getTransactions').and.returnValue(of(mockPayments));
  mapToPayment = jasmine.createSpy('mapToPayment').and.callFake((transaction) => ({ ...transaction }));
}

describe('PaymentActionsSummaryComponent', () => {
  let component: PaymentActionsSummaryComponent;
  let fixture: ComponentFixture<PaymentActionsSummaryComponent>;
  let transactionService: MockTransactionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ButtonModule, CardModule, PaymentActionsSummaryComponent],
      providers: [
        { provide: TRANSACTION_SERVICE, useClass: MockTransactionService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentActionsSummaryComponent);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(TRANSACTION_SERVICE) as unknown as MockTransactionService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load payments on init', fakeAsync(() => {
    tick();
    fixture.detectChanges();

    expect(transactionService.getTransactions).toHaveBeenCalled();
    expect(transactionService.mapToPayment).toHaveBeenCalledTimes(mockPayments.length);
    expect(component.allPayments().length).toBe(mockPayments.length);
  }));


  it('should emit tabSelected event when setting active tab', () => {
    const emitSpy = spyOn(component.tabSelected, 'emit');

    component.setActiveTab('approve');

    expect(component.activeTab()).toBe('approve');
    expect(emitSpy).toHaveBeenCalledWith('approve');
  });

  it('should toggle dropdown state', () => {
    expect(component.dropdownOpen()).toBe(false);

    component.toggleDropdown();
    expect(component.dropdownOpen()).toBe(true);

    component.toggleDropdown();
    expect(component.dropdownOpen()).toBe(false);
  });

  it('should update moreActions totals when statusTotals change', () => {
    const moreActions = component.moreActions;

    expect(moreActions[0].total).toBe(1);
    expect(moreActions[1].total).toBe(1);
    expect(moreActions[2].total).toBe(1);
  });

  it('should handle more actions selection', () => {
    component.selectMoreAction('rejected');

    expect(component.activeTab()).toBe('rejected');
    expect(component.dropdownOpen()).toBe(false);
  });

  it('should return correct total for status', () => {
    expect(component.getTotal('approve')).toBe(1);
    expect(component.getTotal('nonexistent')).toBe(0);
  });

  it('should compute activeMoreAction correctly', () => {
    component.setActiveTab('rejected');

    const action = component.activeMoreAction();
    expect(action?.key).toBe('rejected');
    expect(action?.total).toBe(1);
  });

  it('should compute isMoreTabActive correctly', () => {
    component.setActiveTab('rejected');
    expect(component.isMoreTabActive()).toBe(true);

    component.setActiveTab('approve');
    expect(component.isMoreTabActive()).toBe(false);
  });

  it('should render tab buttons with correct counts', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const allButton = buttons.find(b => b.nativeElement.textContent.includes('View All'));

    expect(allButton?.nativeElement.textContent).toContain('9');
  });
});
