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
  // index = input.required<number>();
  isContentEditable = input<boolean>(false);

  type = computed(() => {
    return this.typingWord();
  });
  toType!: Array<string>;
  success = signal<boolean>(true);
  
  @ViewChild('editableDiv') editableDiv!: ElementRef;

  ngOnInit(): void {
    this.toType = this.type().split('');
  }

  change(event: any) {
    event.preventDefault();

    const value = (event.target as HTMLDivElement)?.textContent || '';
    const length = value.length;
    const data = event.data
    
    this.stateService.currentChar$.next(event?.data);
    
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

      if (value === this.typingWord()) {
        this.success.set(true);
        this.stateService.correct.update(val => val+1)
        
        this.stateService.char.update((val) => val + this.typingWord().length)
      }else {
        this.success.set(false);
        this.stateService.wrong.update(val => val+1)
      }
      
      this.toType = [];
      this.stateService.currentWord$.next(this.stateService.currentWord$.getValue() + 1);
    }
  }

}



