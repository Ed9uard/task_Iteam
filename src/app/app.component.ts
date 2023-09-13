import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isLoggedIn: boolean = true;
    title: string = 'primeng-app-template';

    constructor(
        private appService: AppService,
        private i18n: TranslateService,
        private primengConfig: PrimeNGConfig,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.i18n.setDefaultLang('ua');
        this.i18n.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
        this.appService.language
            .subscribe(lang => {
                this.i18n.use(lang);
            });
        this.appService.language.next('ua');
    }
}
