import { Routes } from '@angular/router';
import { interviewGuard, resultGuard } from './core/guards/interview.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'interview',
    canActivate: [interviewGuard],
    loadComponent: () =>
      import('./features/interview/interview').then((m) => m.Interview),
  },
  {
    path: 'result',
    canActivate: [resultGuard],
    loadComponent: () =>
      import('./features/result/result').then((m) => m.Result),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./features/history/history').then((m) => m.History),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./features/details/details').then((m) => m.Details),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
