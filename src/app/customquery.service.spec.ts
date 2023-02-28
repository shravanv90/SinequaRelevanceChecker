import { TestBed } from '@angular/core/testing';

import { CustomqueryService } from './customquery.service';

describe('CustomqueryService', () => {
  let service: CustomqueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomqueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
