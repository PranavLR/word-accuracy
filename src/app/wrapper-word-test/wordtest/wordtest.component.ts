import { Component, Renderer2, ViewChild, computed, inject, input, output, signal, type ElementRef, type OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-wordtest',
  standalone: true,
  imports: [],
  templateUrl: './wordtest.component.html',
  styleUrl: './wordtest.component.scss'
})
export class WordtestComponent implements OnInit {
  
  renderer = inject(Renderer2);
  stateService = inject(StateService);

  typingWord = input.required<string>();
  index = input.required<number>();
  currentCharEmit = output<string>();
  currentWordEmit = output<number>();
  // correctWordEmit = output<void>();
  // wrongWordEmit = output<void>();

  type = computed(() => {
    return this.typingWord();
  });
  toType!: Array<string>;
  success = signal<boolean>(true);
  isContentEditable = signal<boolean>(true);
  
  offsetWidth: any
  @ViewChild('wrapper') wrapper!: ElementRef;
  @ViewChild('editableDiv') editableDiv!: ElementRef;

  ngOnInit(): void {
    // this.type.set(this.typingWord());
    this.toType = this.type().split('');
  }

  change(event: any) {
    event.preventDefault();

    const value = (event.target as HTMLDivElement)?.textContent || '';
    // console.log('value: ', value);
    const length = value.length;
    const data = event.data
    
    this.currentCharEmit.emit(event?.data)
    
    if (this.type().startsWith(value) || data === ' ') {
      this.success.set(true);
      this.toType = this.type().split('').splice(length)
    } else {
      this.success.set(false);
    }
  }

  keydownEvent(event: KeyboardEvent) {
    if(event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space' || event.code === 'Tab') 
      event.preventDefault();
    
    const value = (event.target as HTMLDivElement)?.textContent;
    if(!value) return
    
    if(event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space') {

      this.toType = [];

      if (value === this.typingWord()) {
        this.success.set(true);
        // this.correctWordEmit.emit();
        this.stateService.correct.update(val => val+1)

      }else {
        this.success.set(false);
        // this.wrongWordEmit.emit();
        this.stateService.wrong.update(val => val+1)
      }
      this.isContentEditable.set(false);
      this.currentWordEmit.emit(this.index() + 1);      

    }
  }

}
