import { RepairStatusPipe } from './repair-status.pipe';

describe('RepairStatusPipe', () => {
    let pipe: RepairStatusPipe;

    beforeEach(() => {
        pipe = new RepairStatusPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should only accept valid type', () => {
        expect(pipe.isValid('completed', pipe['type'])).toBeTrue();
        expect(pipe.isValid('something_wrong', pipe['type'])).toBeFalse();
    });

    it('should return name of type', () => {
        expect(pipe.transform('completed')).toBe(pipe['type'].completed);
    });

    it('should return type, when type is wrong', () => {
        expect(pipe.transform('something_wrong')).toBe('something_wrong');
    });
});
