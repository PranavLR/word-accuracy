import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'word-accuracy', pathMatch: 'full' },
  {
    path: 'word-accuracy',
    loadComponent: () =>
      import('./wrapper-word-test/wrapper-word-test.component').then(
        (c) => c.WrapperWordTestComponent
      ),
  },
];
