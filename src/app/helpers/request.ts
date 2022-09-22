import { GetAllRequestWhere } from '../interface/getAll';
import { HttpParams } from '@angular/common/http';

export function getAllRequestWhere<T>(
    where: GetAllRequestWhere<T>,
    params: HttpParams
): HttpParams {
    Object.entries(where).forEach((value: [string, any]) => {
        const [key, object] = value;

        if (typeof object === 'object') {
            Object.entries(object).forEach((_value) => {
                const [operator, value] = _value;
                params = params.append(`where[${key}][${operator}]`, String(value));
            });
        } else {
            params = params.append(`where[${key}]`, String(object));
        }
    });

    return params;
}
