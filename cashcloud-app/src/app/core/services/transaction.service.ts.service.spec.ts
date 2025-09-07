import { TestBed } from '@angular/core/testing';

import { TransactionServiceTsService } from './transaction.service.ts.service';

describe('TransactionServiceTsService', () => {
  let service: TransactionServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
