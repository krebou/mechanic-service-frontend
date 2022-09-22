import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairAddInformationComponent } from './repair-add-information.component';

describe('RepairAddInformationComponent', () => {
  let component: RepairAddInformationComponent;
  let fixture: ComponentFixture<RepairAddInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairAddInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairAddInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
