import { Routes } from '@angular/router';
import { interviewGuard, resultGuard } from './core/guards/interview.guard';

export const routes: Routes = [
  // Default → AI Chat
  { path: '', redirectTo: 'chat', pathMatch: 'full' },

  // ── AI Agent ─────────────────────────────────────────
  {
    path: 'chat',
    loadComponent: () => import('./features/chat/chat').then((m) => m.Chat),
  },

  // ── Analytics ────────────────────────────────────────
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'progress',
    loadComponent: () =>
      import('./features/progress/progress').then((m) => m.Progress),
  },
  {
    path: 'recommendations',
    loadComponent: () =>
      import('./features/recommendations/recommendations').then(
        (m) => m.Recommendations
      ),
  },

  // ── History ──────────────────────────────────────────
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

  // ── Classic Interview Flow ────────────────────────────
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

  { path: '**', redirectTo: 'chat' },
];
