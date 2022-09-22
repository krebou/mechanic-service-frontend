import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'input[appPriceFormat]',
    standalone: true,
})
export class InputPriceFormatDirective {
    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent) {
        const value = this.element.nativeElement.value as string;
        if (
            (event.code === 'Period' && value.includes('.')) ||
            (event.code === 'Period' && value.length === 0)
        )
            return false;

        if (this.keys.includes(event.code)) return event;

        return false;
    }

    @HostListener('keyup')
    onKeyup() {
        const value = this.element.nativeElement.value as string;
        this.element.nativeElement.value = value.replace(',', '.');
    }

    @HostListener('change')
    onChange() {
        const value = +this.element.nativeElement.value || 0;
        this.element.nativeElement.value = value.toFixed(2);
    }

    keys = [
        'Digit0',
        'Digit1',
        'Digit2',
        'Digit3',
        'Digit4',
        'Digit5',
        'Digit6',
        'Digit7',
        'Digit8',
        'Digit9',
        'Backspace',
        'Delete',
        'Period',
        'Comma',
        'ArrowRight',
        'ArrowLeft',
        'Tab',
        'Esc',
    ];

    constructor(private element: ElementRef) {}
}
