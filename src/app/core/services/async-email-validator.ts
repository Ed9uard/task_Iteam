import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

// Симулюємо запит на сервер для перевірки існування емейла
function serverEmailValidator(email: string): Observable<boolean> {
  // Замість цього можна виконати реальний запит до сервера
  const existingEmails = ['test@test.com', 'example@example.com'];

  return timer(2000).pipe(
    switchMap(() => {
      const isTaken = existingEmails.includes(email);
      
      return of(isTaken);
    })
  );
}

export function asyncEmailValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;

    if (!email) {
      return of(null);
    }

    return serverEmailValidator(email).pipe(
      map(isTaken => (isTaken ? { emailTaken: true } : null)), // Повертаємо помилку emailTaken
      catchError(() => of(null))
    );
  };
}