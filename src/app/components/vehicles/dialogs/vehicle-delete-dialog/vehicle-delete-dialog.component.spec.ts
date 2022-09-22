import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDeleteDialogComponent } from './vehicle-delete-dialog.component';

describe('CarDeleteDialogComponent', () => {
    let component: VehicleDeleteDialogComponent;
    let fixture: ComponentFixture<VehicleDeleteDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VehicleDeleteDialogComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(VehicleDeleteDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
