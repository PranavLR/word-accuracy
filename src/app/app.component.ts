import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { WrapperWordTestComponent } from './wrapper-word-test/wrapper-word-test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, WrapperWordTestComponent],
})
export class AppComponent {
  router = inject(Router);

  title = 'word-accuracy';

}