import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperWordTestComponent } from './wrapper-word-test.component';

describe('WrapperWordTestComponent', () => {
  let component: WrapperWordTestComponent;
  let fixture: ComponentFixture<WrapperWordTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrapperWordTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WrapperWordTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
