import { HttpParams } from '@angular/common/http';
import { getAllRequestWhere } from './request';

interface TestInterface {
    name?: string;
    data?: number;
    morgen?: number;
    client?: number;
    createdAt?: number;
}

describe('getAllRequestWhere', () => {
    let params: HttpParams;
    beforeEach(() => {
        params = new HttpParams();
    });
    it('should pass string param', () => {
        const testParams = { name: 'test' };

        expect(getAllRequestWhere<TestInterface>(testParams, params).get('where[name]')).toEqual(
            'test'
        );
    });

    it('should pass all params with special operators', () => {
        const testParams = {
            name: { $find: 'test' },
            data: { $gte: 20 },
            morgen: { $gt: 30 },
            client: { $lt: 40 },
            createdAt: { $lte: 50 },
        };

        const where = getAllRequestWhere<TestInterface>(testParams, params);
        const keys = where.keys();

        expect(keys.length).toEqual(5);

        expect(keys[0]).toBe('where[name][$find]');
        expect(where.get(keys[0])).toBe('test');
        expect(keys[1]).toBe('where[data][$gte]');
        expect(where.get(keys[1])).toBe('20');
        expect(keys[2]).toBe('where[morgen][$gt]');
        expect(where.get(keys[2])).toBe('30');
        expect(keys[3]).toBe('where[client][$lt]');
        expect(where.get(keys[3])).toBe('40');
        expect(keys[4]).toBe('where[createdAt][$lte]');
        expect(where.get(keys[4])).toBe('50');
    });
});
