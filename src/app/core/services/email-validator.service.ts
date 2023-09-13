import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService {
  constructor() {}

  validateEmailExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      return timer(2000).pipe(
        take(1),
        switchMap(() => {
          if (email === 'test@test.test') {
            return of({ emailExists: true });
          } else {
            return of(null);
          }
        })
      );
    };
  }
}