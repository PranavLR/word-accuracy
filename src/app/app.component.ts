import { Component, inject, type OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { WrapperWordTestComponent } from './wrapper-word-test/wrapper-word-test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, WrapperWordTestComponent],
})
export class AppComponent implements OnInit{
  router = inject(Router);

  loadApp = false

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['word-test'])
      this.loadApp = true;
    }, 1000)
  }
  
}