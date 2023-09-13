import get from 'lodash-es/get';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'get' })
export class GetPipe implements PipeTransform {
    constructor() {
    }

    transform(object: any, route: string): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        return get(object, route, '').toString();
    }
}
