import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDeleteDialogComponent } from './car-delete-dialog.component';

describe('CarDeleteDialogComponent', () => {
  let component: CarDeleteDialogComponent;
  let fixture: ComponentFixture<CarDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
