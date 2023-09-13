import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// services should deal with Http calls

@Injectable({ providedIn: 'root' })
export class HomeService {
    constructor(
        private http: HttpClient
    ) {
    }
}
