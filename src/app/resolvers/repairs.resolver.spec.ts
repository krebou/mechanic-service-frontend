import { TestBed } from '@angular/core/testing';

import { RepairsResolver } from './repairs.resolver';

describe('RepairsResolver', () => {
  let resolver: RepairsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RepairsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
