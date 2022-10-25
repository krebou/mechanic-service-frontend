import { PriceFormatPipe } from './price-format.pipe';

describe('PriceFormatPipe', () => {
    let pipe: PriceFormatPipe;

    beforeEach(() => {
        pipe = new PriceFormatPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should add suffix', () => {
        const price = pipe.transform(100);

        expect(price).toEqual('100 PLN');
    });
});
