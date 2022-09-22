import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRepairsComponent } from './client-repairs.component';

describe('ClientRepairsComponent', () => {
  let component: ClientRepairsComponent;
  let fixture: ComponentFixture<ClientRepairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientRepairsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientRepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
