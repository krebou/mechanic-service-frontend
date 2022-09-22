import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeTableComponent } from './before-table.component';

describe('BeforeTableComponent', () => {
  let component: BeforeTableComponent;
  let fixture: ComponentFixture<BeforeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeforeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeforeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
