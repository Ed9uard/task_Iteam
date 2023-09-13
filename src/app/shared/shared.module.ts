import { NgModule } from '@angular/core';

import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { DebounceClickDirective } from '@shared/directives/debounce-click.directive';
import { GetPipe } from '@shared/pipes/get.pipe';
import { HandleLinkDirective } from '@shared/directives/handle-link.directive';
import { ModalBaseComponent } from '@shared/components/modal-base/modal-base.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ThrottleClickDirective } from '@shared/directives/throttle-click.directive';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { VendorModule } from '@shared/vendor.module';

@NgModule({
    declarations: [
        GetPipe,
        ModalBaseComponent,
        SidebarComponent,
        // directives
        ClickOutsideDirective,
        DebounceClickDirective,
        HandleLinkDirective,
        ThrottleClickDirective
    ],
    imports: [
        CommonModule,
        RouterModule,
        VendorModule,
        TranslateModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        GetPipe,
        ModalBaseComponent,
        ReactiveFormsModule,
        SidebarComponent,
        TranslateModule,
        // directives
        ClickOutsideDirective,
        DebounceClickDirective,
        HandleLinkDirective,
        ThrottleClickDirective
    ]
})
export class SharedModule { }
