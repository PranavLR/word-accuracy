import { AsyncPipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  type OnDestroy,
  type OnInit
} from '@angular/core';
import {
  distinctUntilChanged,
  interval,
  takeWhile,
  type Subscription,
} from 'rxjs';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent implements OnInit, OnDestroy {

  stateService = inject(StateService);
  private timerSubscription!: Subscription;

  time = computed(() => {
    return this.stateService.time();
  });

  progress = computed(() => {
    return (this.time() / this.stateService.InitialTimerCount) * 100;
  });

  bgColor = computed(() => {
    if (this.progress() < 15) {
      return '#ff0000'
    } else if (this.progress() < 30) {
      return '#ffa500'
    } else if (this.progress() < 50) {
      return '#ffd000'
    }
    else 
    return '#39b37d'
  })


  ngOnInit(): void {
    this.stateService.isActiveInterval$.pipe(distinctUntilChanged()).subscribe({
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
            this.stateService.isCompleted$.next(true);
            this.stateService.isActiveInterval$.next(false);
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
