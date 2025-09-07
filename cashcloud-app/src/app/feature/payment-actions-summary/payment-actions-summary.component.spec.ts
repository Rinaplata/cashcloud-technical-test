import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentActionsSummaryComponent } from './payment-actions-summary.component';

describe('PaymentActionsSummaryComponent', () => {
  let component: PaymentActionsSummaryComponent;
  let fixture: ComponentFixture<PaymentActionsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentActionsSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentActionsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
