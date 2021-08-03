import { TestBed } from '@angular/core/testing';

import { DeliveryrestService } from './deliveryrest.service';

describe('DeliveryrestService', () => {
  let service: DeliveryrestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryrestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
