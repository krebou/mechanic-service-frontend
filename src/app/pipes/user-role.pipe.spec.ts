import { UserRolePipe } from './user-role.pipe';

describe('UserRolePipe', () => {
    let pipe: UserRolePipe;

    beforeEach(() => {
        pipe = new UserRolePipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should only accept valid type', () => {
        expect(pipe.isValid('admin', pipe['type'])).toBeTrue();
        expect(pipe.isValid('something_wrong', pipe['type'])).toBeFalse();
    });

    it('should return name of type', () => {
        expect(pipe.transform('admin')).toBe(pipe['type'].admin);
    });

    it('should return type, when type is wrong', () => {
        expect(pipe.transform('something_wrong')).toBe('something_wrong');
    });
});
