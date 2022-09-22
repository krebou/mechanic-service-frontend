import { TestBed } from '@angular/core/testing';

import { ClientInfoResolver } from './client-info.resolver';

describe('ClientInfoResolver', () => {
  let resolver: ClientInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ClientInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
