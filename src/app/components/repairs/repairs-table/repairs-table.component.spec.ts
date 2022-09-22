import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairsTableComponent } from './repairs-table.component';

describe('RepairsTableComponent', () => {
  let component: RepairsTableComponent;
  let fixture: ComponentFixture<RepairsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
