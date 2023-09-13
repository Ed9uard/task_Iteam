import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { takeUntil, debounceTime, buffer, map } from 'rxjs/operators';


@Component({
    selector: 'app-stopwatch-form',
    templateUrl: './stopwatch-form.component.html',
    styleUrls: ['./stopwatch-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopwatchFormComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  private clicks$: Subject<number> = new Subject<number>();

  filterForm: FormGroup = this.fb.group(this.getEmptyForm());

  isRunning: boolean = false;
  displayTime: string = '00:00:00';
  startTime: number = 0;
  elapsedTime: number = 0;
  lastClickTime: number = 0;
  waitWasPressed: boolean = false;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.isRunning) {
          this.elapsedTime = Date.now() - this.startTime;
          this.filterForm.setValue({ floatInput: this.formatTime(this.elapsedTime) });
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getEmptyForm(reset = false) {
    return {
      floatInput: '00:00:00'
    };
  }

  onStartStopTimer(): void {
    if (this.isRunning) {
      if (!this.waitWasPressed) {
        this.elapsedTime = 0;
      }
      this.isRunning = false;
    } else {
      this.isRunning = true;
      if (this.elapsedTime === 0) {
        this.startTime = Date.now();
      } else {
        this.startTime = Date.now() - this.elapsedTime;
      }
    }
    this.waitWasPressed = false;
  }

  onWaitTimer(): void {
    const currentTime = new Date().getTime();
    const timeSinceLastClick = currentTime - this.lastClickTime;
    
    if (timeSinceLastClick <= 300) {
      if (this.isRunning) {
        this.isRunning = false;
      } else {
        this.isRunning = true;
        this.startTime = Date.now() - this.elapsedTime;
      }
    }
    
    this.lastClickTime = currentTime;
    this.waitWasPressed = true;
  }

  onResetTimer(): void {
    this.isRunning = false;
    this.elapsedTime = 0;
    this.filterForm.setValue({ floatInput: '00:00:00' });
    this.waitWasPressed = false;
  }

  formatTime(milliseconds: number): string {
    const hours = Math.floor(milliseconds / 3600000);
    milliseconds = milliseconds % 3600000;
    const minutes = Math.floor(milliseconds / 60000);
    milliseconds = milliseconds % 60000;
    const seconds = Math.floor(milliseconds / 1000);

    return `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  }

  padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }
}

