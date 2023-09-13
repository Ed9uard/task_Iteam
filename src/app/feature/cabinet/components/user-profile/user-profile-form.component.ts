import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FrameworkVersion, Framework } from '@core/models/cabinet';
import { TranslateService } from '@ngx-translate/core';
import { CabinetService } from '@core/services/cabinet.service';
import { EmailValidatorService } from '@core/services/email-validator.service'; 
import { finalize } from 'rxjs/operators';


@Component({
    selector: 'app-user-profile-form',
    templateUrl: './user-profile-form.component.html',
    styleUrls: ['./user-profile-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileFormComponent {

    @Input() frameworks: Framework[] = [];
    @Input() frameworkVersions: FrameworkVersion[] = [];

    frameworkVersionData: { [key: string]: string[] } = {
        angular: ['1.1.1', '1.2.1', '1.3.3'],
        react: ['2.1.2', '3.2.4', '4.3.1'],
        vue: ['3.3.1', '5.2.1', '5.1.3'],
      };
    
    private frameworkVersionsCache: { [key: string]: string[] } = {};
    
    patternForm: FormGroup = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        framework: ['', Validators.required],
        frameworkVersion: [{ value: '', disabled: true }, Validators.required],
        email: ['', [Validators.required, Validators.email]],
        hobby: this.fb.array([])
    });
    blockUI: boolean = false;
    isEmailValid: boolean = false;

    constructor(
        private fb: FormBuilder,
        private translate: TranslateService,
        private cabinetSvc: CabinetService,
        private emailValidatorService: EmailValidatorService 
    ) {
        this.patternForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            framework: ['', Validators.required],
            frameworkVersion: [{ value: '', disabled: true }, Validators.required],     
            email: ['', [Validators.required, Validators.email], [this.emailValidatorService.validateEmailExists()]],
            hobby: this.fb.array([])
        });

        this.addHobby();

        this.patternForm.get('framework')?.valueChanges.subscribe(() => {
            this.onFrameworkChange();
          });
    }
   
    addHobby() {
        const hobbyArray = this.patternForm.get('hobby') as FormArray;
        hobbyArray.push(this.fb.group({
        name: ['', Validators.required], 
        duration: ['', Validators.required] 
    }));
    }

    // Видалення поля для хобі
    removeHobby(index: number) {
        const hobbyArray = this.patternForm.get('hobby') as FormArray;
        if(hobbyArray.length>1){
            hobbyArray.removeAt(index);
        }else{
            this.patternForm.get('hobby')?.reset();
        }
    }
   
    onFrameworkChange() {
        const frameworkControl = this.patternForm.get('framework');
        const frameworkVersionControl = this.patternForm.get('frameworkVersion');
      
        if (frameworkControl !== null && frameworkVersionControl !== null) {
          if (frameworkControl.value !== null) {
            frameworkVersionControl.enable();
          } else {
            frameworkVersionControl.disable();
            frameworkVersionControl.reset();
          }
        }
    }
    
    clearFrameworkSelection() {
        this.patternForm.get('framework')?.setValue(''); 
        this.patternForm.get('frameworkVersion')?.disable();
        this.patternForm.get('frameworkVersion')?.reset();
    }

    formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    getFrameworkVersions() {
        const selectedFramework = this.patternForm.get('framework')?.value.name;
        
        // Перевірка, чи результати вже є в кеші
        if (this.frameworkVersionsCache[selectedFramework]) {
          return this.frameworkVersionsCache[selectedFramework];
        }
      
        const versions = this.frameworkVersionData[selectedFramework] || [];
        this.frameworkVersionsCache[selectedFramework] = versions;
      
        return versions;
    }

    onSave() {
        if (this.patternForm.valid) {
            const formData = this.patternForm.value;
            const hobbies = formData.hobby.map((h: any) => ({
                name: h.name,
                duration: h.duration,
                }));

            const serverData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                dateOfBirth: this.formatDate(formData.dateOfBirth),
                framework: formData.framework.code,
                frameworkVersion: formData.frameworkVersion,
                email: formData.email,
                hobby: hobbies,
            };
        
            this.saveObject(serverData)
        }
    }
      
    saveObject(modalData: any) {
        this.blockUI = true;

        this.cabinetSvc.sendProfile(modalData)
        .pipe(finalize(() => this.blockUI = false))
        .subscribe({
            next: data => {
                if (data.success) {
                   
                }
            },
            error: error => {
                console.error('There was an error!', error);
            }
        });
    }
}
