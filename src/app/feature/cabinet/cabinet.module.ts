import { CabinetRouting } from './cabinet.routing';
import { StopwatchFormComponent } from './components/stopwatch/stopwatch-form.component';
import { StopwatchPanelComponent } from './pages/stopwatch-panel/stopwatch-panel.component';

import { UserProfileFormComponent } from './components/user-profile/user-profile-form.component';
import { UserPanelComponent } from './pages/user-panel/user-profile-panel.component';



import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { VendorModule } from '@shared/vendor.module';

// You don't need to import CommonModule, FormsModule, ReactiveFormsModule and TranslateModule, cause
// it's already imported with SharedModule

@NgModule({
    imports: [
        CabinetRouting,
        SharedModule,
        VendorModule
    ],
    declarations: [
        StopwatchFormComponent,
        StopwatchPanelComponent,

        UserProfileFormComponent,
        UserPanelComponent
    ],
    exports: [
        StopwatchPanelComponent,
        UserPanelComponent
    ]
})
export class CabinetModule { }
