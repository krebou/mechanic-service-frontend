import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsSelectActionDialogComponent } from './clients-select-action-dialog.component';

describe('ClientsSelectActionDialogComponent', () => {
  let component: ClientsSelectActionDialogComponent;
  let fixture: ComponentFixture<ClientsSelectActionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsSelectActionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsSelectActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
