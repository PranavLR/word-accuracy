import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, ViewChildren, inject, signal, type AfterViewInit, type OnDestroy, type OnInit, type QueryList } from '@angular/core';
import { StateService } from '../services/state.service';
import { TimerComponent } from "../timer/timer.component";
import { WordtestComponent } from './wordtest/wordtest.component';

@Component({
  selector: 'app-wrapper-word-test',
  standalone: true,
  templateUrl: './wrapper-word-test.component.html',
  styleUrl: './wrapper-word-test.component.scss',
  imports: [AsyncPipe, WordtestComponent, TimerComponent, NgTemplateOutlet]
})

export class WrapperWordTestComponent implements OnInit, OnDestroy, AfterViewInit {

  stateService = inject(StateService);

  @ViewChildren(WordtestComponent) wordtestComponent!: QueryList<WordtestComponent>;

  typingWord = signal<Array<string>>([]);
  currentWord = signal<number>(0);
  currentChar = signal<string>('');
  isCompleted = signal<boolean>(false);

  ngOnInit(): void {

    this.stateService.isCompleted$.subscribe({
      next: (value) => {
        this.isCompleted.set(value);
        this.typingWord.set(this.stateService.simpleWords().sort(() => Math.random() - 0.5))

        if (!value) {
          this.currentWord.set(0);
          this.stateService.correct.set(0);
          this.stateService.wrong.set(0);
          this.stateService.char.set(0);
          this.stateService.accuracy.set(0);
          this.stateService.currentWord$.next(0);
        }
      }
    })

    this.stateService.currentChar$.subscribe({
      next: (value) => {
        if (value) {
          this.currentChar.set(value);
          this.stateService.isActiveInterval$.next(true);
        }
      }
    })

    this.stateService.currentWord$.subscribe({
      next: (value) => {
        if (value) {
          this.currentWord.set(value);
          this.accuracy();
          setTimeout(() => {
            this.addFocusOnElement(this.currentWord());
          })
        }
      }
    })
  }

  ngAfterViewInit(): void {
    this.addFocusOnElement(0);
  }

  accuracy() {
    const initialCount = this.stateService.correct();
    const finalCount = this.stateService.correct() + this.stateService.wrong()
    const percentage = ((initialCount) / finalCount) * 100

    this.stateService.accuracy.set(Math.ceil(percentage));
  }

  addFocusOnElement(campareWith: number) {
      this.wordtestComponent.forEach((child, index) => {
        if (index === campareWith) {
          child.editableDiv.nativeElement.focus();
        }
      });
  }

  focusOnClick() {
    this.addFocusOnElement(this.currentWord())
  }

  tryAgain() {
    this.stateService.isCompleted$.next(false);
    this.addFocusOnElement(0);
    this.stateService.resetTime();
  }

  ngOnDestroy(): void {
  }

}

