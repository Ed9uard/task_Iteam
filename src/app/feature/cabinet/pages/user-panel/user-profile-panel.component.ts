import { CabinetService } from '@core/services/cabinet.service';
import { Component, OnInit } from '@angular/core';
import { FrameworkVersion, Framework } from '@core/models/cabinet';
import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-user-panel',
    templateUrl: './user-profile-panel.component.html',
    styleUrls: ['./user-profile-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {
    // catalogs
    frameworks$: Observable<Framework[]> = of([]);

    constructor(
        private cabinetSvc: CabinetService,
        private translate: TranslateService
    ) {
    }

    ngOnInit() {
        this.frameworks$ = this.cabinetSvc.getFrameWorks();
    }
}
