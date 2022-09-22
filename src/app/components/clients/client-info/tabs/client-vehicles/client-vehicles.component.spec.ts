import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVehiclesComponent } from './client-vehicles.component';

describe('ClientVehiclesComponent', () => {
  let component: ClientVehiclesComponent;
  let fixture: ComponentFixture<ClientVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClientVehiclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
