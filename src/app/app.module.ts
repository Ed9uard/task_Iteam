import { APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { AppService } from './app.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { VendorModule } from '@shared/vendor.module';

// AoT requires an exported function for factories
export const HttpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, 'assets/i18n/', '.json');

export const initializeApp = (appService: AppService) => (): Promise<boolean> => appService.loadConfig();
export const initializeI18n = (appService: AppService) => (): Promise<boolean> => appService.initI18n();

@NgModule({
    imports: [
        AppRouting,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule,
        TranslateModule.forRoot({
            defaultLanguage: 'ua',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        VendorModule
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppService], multi: true },
        { provide: APP_INITIALIZER, useFactory: initializeI18n, deps: [AppService], multi: true },
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
