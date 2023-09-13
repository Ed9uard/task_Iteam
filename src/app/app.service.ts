import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from '@core/models/app-config';
import { Injectable, Injector } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
export let AppConfig: IAppConfig;

@Injectable({ providedIn: 'root' })
export class AppService {
    language: BehaviorSubject<string> = new BehaviorSubject<string>('ua');

    constructor(
        private http: HttpClient,
        private injector: Injector,
        private translate: TranslateService
    ) {
        // default configuration in case we missed config file
        AppConfig = {
            REST_API_URL: '/your-app/rest',
            TASKS_LIMIT: 10000
        };
    }

    loadConfig(): Promise<boolean> {
        const jsonFile = `assets/config/config.json`;
        return new Promise((resolve, reject) => {
            void this.http.get(jsonFile)
                .toPromise()
                .catch((err) => {
                    console.error('ERROR getting config data', err);
                    resolve(true);
                    return throwError(err || 'Error while getting config data');
                })
                .then((configData) => {
                    AppConfig = configData as IAppConfig;
                    resolve(true);
                });
        });
    }

    initI18n(): Promise<boolean> {
        return new Promise((resolve) => {
            const locationInitialized: Promise<any> = this.injector.get(LOCATION_INITIALIZED, Promise.resolve(null));

            void locationInitialized.then(() => {
                this.translate.setDefaultLang('ua');
                this.translate.use('ua').subscribe(() => {
                    console.info('i18n loaded successfully');
                }, err => {
                    console.error(`Problem with language initialization.'`);
                }, () => {
                    resolve(true);
                });
            });
        });
    }
}
