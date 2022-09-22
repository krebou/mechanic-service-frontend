import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairAddCostsComponent } from './repair-add-costs.component';

describe('RepairAddCostsComponent', () => {
  let component: RepairAddCostsComponent;
  let fixture: ComponentFixture<RepairAddCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairAddCostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairAddCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
