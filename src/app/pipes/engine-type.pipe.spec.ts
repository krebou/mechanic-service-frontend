import { EngineTypePipe } from './engine-type.pipe';

describe('EngineTypePipe', () => {
    let pipe: EngineTypePipe;

    beforeEach(() => {
        pipe = new EngineTypePipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should only accept valid type', () => {
        expect(pipe.transform('PETROL')).not.toEqual('none');
    });

    it('should return name of type', () => {
        expect(pipe.transform('PETROL')).toBe(pipe['engineTypes'].PETROL);
    });
});
