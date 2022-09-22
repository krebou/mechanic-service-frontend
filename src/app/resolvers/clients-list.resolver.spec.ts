import { TestBed } from '@angular/core/testing';

import { ClientsListResolver } from './clients-list.resolver';

describe('ClientsListResolver', () => {
  let resolver: ClientsListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ClientsListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
