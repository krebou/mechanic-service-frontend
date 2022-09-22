import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDeleteDialogComponent } from './client-delete-dialog.component';

describe('ClientDeleteDialogComponent', () => {
  let component: ClientDeleteDialogComponent;
  let fixture: ComponentFixture<ClientDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
