import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordtestComponent } from './wordtest.component';

describe('WordtestComponent', () => {
  let component: WordtestComponent;
  let fixture: ComponentFixture<WordtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordtestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
