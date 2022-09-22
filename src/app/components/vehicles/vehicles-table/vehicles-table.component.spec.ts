import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesTableComponent } from './vehicles-table.component';

describe('VehlicesTableComponent', () => {
    let component: VehiclesTableComponent;
    let fixture: ComponentFixture<VehiclesTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VehiclesTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(VehiclesTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
