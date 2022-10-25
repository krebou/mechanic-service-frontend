import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeTableStandaloneComponent } from './before-table.standalone-component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatMenuHarness, MatMenuItemHarness } from '@angular/material/menu/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { ActionButtonStandaloneComponent } from '../action-button/action-button.standalone-component';
import { TableActionSelection } from '../../interface/table-action.interface';
import { TABLE_ACTION_SELECTION } from '../../injectionTokens/table-action-selection.injection-token';
import { MatOptionHarness } from '@angular/material/core/testing';

const NEW_TABLE_ACTION_SELECTION: TableActionSelection = {
    button: 'Just do it',
    placeholder: 'Please test it',
    data: [
        { action: 'edit', button: 'EDIT' },
        { action: 'test', button: 'Test it' },
        { action: 'removeAll', button: 'Remove All' },
    ],
};

describe('BeforeTableComponent', () => {
    let component: BeforeTableStandaloneComponent;
    let fixture: ComponentFixture<BeforeTableStandaloneComponent>;
    let loader: HarnessLoader;

    let button: MatButtonHarness, select: MatSelectHarness;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BeforeTableStandaloneComponent, NoopAnimationsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(BeforeTableStandaloneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        loader = TestbedHarnessEnvironment.loader(fixture);

        button = await loader.getHarness(MatButtonHarness);
        select = await loader.getHarness(MatSelectHarness);

        component.count = 1;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be button disabled and select closed', async () => {
        expect(await button.isDisabled()).toBeTrue();
        expect(await select.isOpen()).toBeFalse();
    });

    it('should be button able, after option selected', async () => {
        await select.open();
        const options = await select.getOptions();
        expect(options.length).toBeGreaterThanOrEqual(1);

        expect(await options[0].isSelected()).toBeFalse();
        await options[0].click();
        expect(await options[0].isSelected()).toBeTrue();

        fixture.detectChanges();

        expect(await button.isDisabled()).toBeFalse();
    });

    it('should be call method onSelectedAction, after button click', async () => {
        spyOn(component, 'onSelectedAction');
        await select.open();
        const options = await select.getOptions();
        await options[0].click();
        await button.click();

        fixture.detectChanges();

        expect(component.onSelectedAction).toHaveBeenCalledTimes(1);
    });

    it('should emit action, after call onSelectedAction method', () => {
        const emitSpyOn = spyOn(component['action'], 'emit');

        component.onSelectedAction();

        fixture.detectChanges();

        expect(emitSpyOn).toHaveBeenCalledTimes(1);
    });
});

describe('BeforeTableComponent InjectionToken', () => {
    let component: BeforeTableStandaloneComponent;
    let fixture: ComponentFixture<BeforeTableStandaloneComponent>;
    let loader: HarnessLoader;

    let select: MatSelectHarness, optionsItem: MatOptionHarness[];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BeforeTableStandaloneComponent, NoopAnimationsModule],
            providers: [
                {
                    provide: TABLE_ACTION_SELECTION,
                    useValue: NEW_TABLE_ACTION_SELECTION,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BeforeTableStandaloneComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

        fixture.detectChanges();
    });

    it('should be TABLE_ACTION_SELECTION provided with useValue and menu should have 3 items', async () => {
        select = await loader.getHarness(MatSelectHarness);
        await select.open();
        optionsItem = await select.getOptions();

        expect(component.actions.length).toEqual(3);

        expect(optionsItem.length).toEqual(3);

        expect(await optionsItem[2].getText()).toBe(NEW_TABLE_ACTION_SELECTION.data[2].button);
    });
});
