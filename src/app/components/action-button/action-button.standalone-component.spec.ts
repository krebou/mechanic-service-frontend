import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonStandaloneComponent } from './action-button.standalone-component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatMenuHarness, MatMenuItemHarness } from '@angular/material/menu/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActionButtonMenuInterface } from '../../interface/action-button-menu.interface';
import { ACTION_BUTTON_MENU } from '../../injectionTokens/action-button-menu.injection-token';

const NEW_ACTION_BUTTON: ActionButtonMenuInterface[] = [
    { action: 'save', button: 'SAVE' },
    { action: 'change', button: 'EDIT' },
    { action: 'deleteMany', button: 'DELETE ALL' },
];

describe('ActionButtonComponent', () => {
    let component: ActionButtonStandaloneComponent;
    let fixture: ComponentFixture<ActionButtonStandaloneComponent>;
    let loader: HarnessLoader;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ActionButtonStandaloneComponent, NoopAnimationsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(ActionButtonStandaloneComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should find button and open menu after click', async () => {
        spyOn(component, 'makeAction');

        const button = await loader.getHarness(MatButtonHarness);
        const menu = await loader.getHarness(MatMenuHarness);

        button.click();

        expect(await menu.isOpen()).toBeTrue();
    });

    it('should emit action, after call makeAction method', () => {
        const emitSpyOn = spyOn(component['action'], 'emit');

        component.makeAction('edit');

        fixture.detectChanges();

        expect(emitSpyOn).toHaveBeenCalledTimes(1);
        expect(emitSpyOn).toHaveBeenCalledWith('edit');
    });

    describe('check button menu', () => {
        let button: MatButtonHarness, menu: MatMenuHarness, menuItems: MatMenuItemHarness[];

        beforeEach(async () => {
            button = await loader.getHarness(MatButtonHarness);
            menu = await loader.getHarness(MatMenuHarness);

            await button.click();

            menuItems = await menu.getItems();

            fixture.detectChanges();
        });

        it('should find 2 menu items', async () => {
            expect(menuItems.length).toEqual(2);
        });

        it('should be closed, after click item', async () => {
            expect(await menu.isOpen()).toBeTrue();

            await menuItems[0].click();

            expect(await menu.isOpen()).toBeFalse();
        });

        it('should be called makeAction method, after click item', async () => {
            spyOn(component, 'makeAction');

            await menuItems[0].click();

            expect(component.makeAction).toHaveBeenCalledTimes(1);
        });
    });
});

describe('ActionButtonComponent InjectionToken', () => {
    let component: ActionButtonStandaloneComponent;
    let fixture: ComponentFixture<ActionButtonStandaloneComponent>;
    let loader: HarnessLoader;

    let menu: MatMenuHarness, menuItems: MatMenuItemHarness[];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ActionButtonStandaloneComponent, NoopAnimationsModule],
            providers: [
                {
                    provide: ACTION_BUTTON_MENU,
                    useValue: NEW_ACTION_BUTTON,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ActionButtonStandaloneComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should be ACTION_BUTTON_MENU provided with useValue and menu should have 3 items', async () => {
        menu = await loader.getHarness(MatMenuHarness);
        await menu.open();
        menuItems = await menu.getItems();

        expect(component.menuList.length).toEqual(3);

        expect(menuItems.length).toEqual(3);

        expect(await menuItems[2].getText()).toBe(NEW_ACTION_BUTTON[2].button);
    });
});
