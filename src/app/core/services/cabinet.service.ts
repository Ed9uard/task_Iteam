import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { frameworks } from '@core/mock/cabinet';
import { FrameworkVersion, Framework } from '@core/models/cabinet';
import { AppConfig } from 'app/app.service';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CabinetService {
        constructor(
            private http: HttpClient
        ) {}


    getFrameWorks(): Observable<Framework[]> {
        return of(frameworks);
    }

    sendProfile(params:any): Observable<any> {
        console.log('console send params', params);
        return this.http.post<any>(AppConfig.REST_API_URL +'/cabinet/saveProfile', params);
    }
    
}