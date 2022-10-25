import { UserStatusPipe } from './user-status.pipe';

describe('UserStatusPipe', () => {
    let pipe: UserStatusPipe;

    beforeEach(() => {
        pipe = new UserStatusPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should only accept valid type', () => {
        expect(pipe.isValid('active', pipe['type'])).toBeTrue();
        expect(pipe.isValid('something_wrong', pipe['type'])).toBeFalse();
    });

    it('should return name of type', () => {
        expect(pipe.transform('active')).toBe(pipe['type'].active);
    });

    it('should return type, when type is wrong', () => {
        expect(pipe.transform('something_wrong')).toBe('something_wrong');
    });
});
