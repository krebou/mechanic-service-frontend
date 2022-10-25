import { InputPriceFormatDirective } from './input-price-format.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('PriceFormatDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let input: DebugElement;
    let dir: InputPriceFormatDirective;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputPriceFormatDirective],
            declarations: [TestComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        input = fixture.debugElement.query(By.directive(InputPriceFormatDirective));
        dir = input.injector.get(InputPriceFormatDirective) as InputPriceFormatDirective;
        fixture.detectChanges();
    });

    it('should hostListener(keydown) call', () => {
        spyOn(dir, 'onKeydown');

        input.nativeElement.dispatchEvent(new KeyboardEvent('keydown'));

        fixture.detectChanges();

        expect(dir.onKeydown).toHaveBeenCalledTimes(1);
    });

    it('should accept only selected keys', () => {
        expect(dir.onKeydown(new KeyboardEvent('keydown', { code: 'Digit0' }))).toBeInstanceOf(
            KeyboardEvent
        );

        expect(dir.onKeydown(new KeyboardEvent('keydown', { code: 'Shift' }))).toBeFalse();
    });

    it('should change Comma to dot - hostListener(keyup) event', () => {
        input.nativeElement.value = '700,00';

        const event = new KeyboardEvent('keyup', {
            cancelable: true,
        });

        input.nativeElement.dispatchEvent(event);
        expect(input.nativeElement.value).toBe('700.00');
    });

    it('should price toFixed(2) - hostListener(change) event', () => {
        input.nativeElement.value = '700';

        const event = new InputEvent('change', {
            cancelable: true,
        });

        input.nativeElement.dispatchEvent(event);
        expect(input.nativeElement.value).toBe('700.00');
    });
});

@Component({
    template: '<div><input appPriceFormat /></div>',
})
export class TestComponent {}
