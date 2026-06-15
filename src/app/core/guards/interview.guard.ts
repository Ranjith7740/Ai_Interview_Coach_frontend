import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { InterviewStateService } from '../../state/interview-state.service';

export const interviewGuard: CanActivateFn = () => {
  const state = inject(InterviewStateService);
  const router = inject(Router);
  if (!state.hasActiveInterview()) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};

export const resultGuard: CanActivateFn = () => {
  const state = inject(InterviewStateService);
  const router = inject(Router);
  if (!state.hasResult()) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
