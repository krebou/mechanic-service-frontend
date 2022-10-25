import { GenderPipe } from './gender.pipe';

describe('GenderPipe', () => {
    let pipe: GenderPipe;

    beforeEach(() => {
        pipe = new GenderPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should only accept valid type', () => {
        expect(pipe.isValid('female', pipe['type'])).toBeTrue();
        expect(pipe.isValid('something_wrong', pipe['type'])).toBeFalse();
    });

    it('should return name of type', () => {
        expect(pipe.transform('female')).toBe(pipe['type'].female);
    });

    it('should return type, when type is wrong', () => {
        expect(pipe.transform('something_wrong')).toBe('something_wrong');
    });
});
