import {
  Component,
  computed,
  effect,
  inject,
  signal,
  type OnDestroy,
  type OnInit,
  type WritableSignal,
} from '@angular/core';
import {
  distinctUntilChanged,
  interval,
  takeWhile,
  type Subscription,
} from 'rxjs';
import { StateService } from '../services/state.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent implements OnInit, OnDestroy {
  stateService = inject(StateService);

  time = computed(() => {
    return this.stateService.time();
  });

  progress = computed(() => {
    return this.time() / this.stateService.InitialTimerCount * 100
  });

  private timerSubscription!: Subscription;

  ngOnInit(): void {
    this.stateService.isActiveInterval.pipe(distinctUntilChanged()).subscribe({
      next: (value) => {
        if (value) {
          this.start();
        }
      },
    });
  }

  start() {
    this.timerSubscription = interval(1000)
      .pipe(takeWhile(() => this.time() > 0))
      .subscribe({
        next: () => {
          this.stateService.time.update((val) => val - 1);

          if (this.time() === 0) {
            console.log('this.time(): ', this.time());
            this.stateService.isCompleted.next(true);
            this.stateService.isActiveInterval.next(false);
            this.timerSubscription.unsubscribe();
          }
        },
      });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
