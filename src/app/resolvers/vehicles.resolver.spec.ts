import { TestBed } from '@angular/core/testing';

import { VehiclesResolver } from './vehicles.resolver';

describe('VehiclesResolver', () => {
  let resolver: VehiclesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VehiclesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
