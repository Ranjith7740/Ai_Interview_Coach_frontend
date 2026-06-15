import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterviewStateService } from '../../state/interview-state.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.html',
  styleUrl: './result.css',
})
export class Result implements OnInit {
  private readonly router = inject(Router);
  readonly state = inject(InterviewStateService);

  ngOnInit(): void {
    if (!this.state.hasResult()) {
      this.router.navigate(['/home']);
    }
  }

  get scoreColor(): string {
    const score = this.state.currentResult()?.score ?? 0;
    if (score >= 8) return 'excellent';
    if (score >= 6) return 'good';
    if (score >= 4) return 'average';
    return 'poor';
  }

  get scoreLabel(): string {
    const score = this.state.currentResult()?.score ?? 0;
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Needs Work';
    return 'Poor';
  }

  get scorePercent(): number {
    return ((this.state.currentResult()?.score ?? 0) / 10) * 100;
  }

  restartInterview(): void {
    this.state.reset();
    this.router.navigate(['/home']);
  }

  viewHistory(): void {
    this.router.navigate(['/history']);
  }

  tryAgain(): void {
    const skill = this.state.selectedSkill();
    this.state.reset();
    this.router.navigate(['/home'], { queryParams: { skill } });
  }
}
