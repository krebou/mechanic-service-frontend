import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairAddSelectVehicleComponent } from './repair-add-select-vehicle.component';

describe('RepairAddSelectVehicleComponent', () => {
  let component: RepairAddSelectVehicleComponent;
  let fixture: ComponentFixture<RepairAddSelectVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairAddSelectVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairAddSelectVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
