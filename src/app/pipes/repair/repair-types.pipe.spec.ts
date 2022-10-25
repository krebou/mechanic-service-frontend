import { RepairTypesPipe } from './repair-types.pipe';

describe('RepairTypesPipe', () => {
    let pipe: RepairTypesPipe;

    beforeEach(() => {
        pipe = new RepairTypesPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should only accept valid type', () => {
        expect(pipe.isValid('repair', pipe['type'])).toBeTrue();
        expect(pipe.isValid('something_wrong', pipe['type'])).toBeFalse();
    });

    it('should return name of type', () => {
        expect(pipe.transform('repair')).toBe(pipe['type'].repair);
    });

    it('should return type, when type is wrong', () => {
        expect(pipe.transform('something_wrong')).toBe('something_wrong');
    });
});
