import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'word-test',
    loadComponent: () =>
      import('./wrapper-word-test/wrapper-word-test.component').then(
        (c) => c.WrapperWordTestComponent
      ),
  },
];
