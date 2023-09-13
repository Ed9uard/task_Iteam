import { Component, Injector } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-modal-base',
    template: 'no template'
})
export class ModalBaseComponent {
    protected fb: FormBuilder;

    /** @ignore */
    constructor(
        protected config: DynamicDialogConfig,
        protected ref: DynamicDialogRef,
        injector: Injector
    ) {
        this.fb = injector.get(FormBuilder);
    }
}
