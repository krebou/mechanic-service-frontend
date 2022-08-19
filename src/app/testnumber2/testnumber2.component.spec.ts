import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testnumber2Component } from './testnumber2.component';

describe('Testnumber2Component', () => {
  let component: Testnumber2Component;
  let fixture: ComponentFixture<Testnumber2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ Testnumber2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testnumber2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
