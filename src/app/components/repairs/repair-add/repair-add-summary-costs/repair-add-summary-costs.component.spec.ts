import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairAddSummaryCostsComponent } from './repair-add-summary-costs.component';

describe('RepairAddSummaryCostsComponent', () => {
  let component: RepairAddSummaryCostsComponent;
  let fixture: ComponentFixture<RepairAddSummaryCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairAddSummaryCostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairAddSummaryCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
