import { AutoCompleteModule } from 'primeng/autocomplete';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
    imports: [
        AutoCompleteModule,
        BlockUIModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        DropdownModule,
        DynamicDialogModule,
        InputTextModule,
        MenuModule,
        MultiSelectModule,
        PanelModule,
        ProgressSpinnerModule,
        FieldsetModule
       
    ],
    exports: [
        AutoCompleteModule,
        BlockUIModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        DropdownModule,
        DynamicDialogModule,
        InputTextModule,
        MenuModule,
        MultiSelectModule,
        PanelModule,
        ProgressSpinnerModule,
        FieldsetModule
    ],
    providers: [
        MessageService
    ]
})
export class VendorModule { }
