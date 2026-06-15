import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InterviewService } from '../../services/interview.service';
import { InterviewStateService } from '../../state/interview-state.service';
import { Spinner } from '../../shared/components/spinner/spinner';
import { SKILLS } from '../../models/interview.model';

@Component({
  selector: 'app-home',
  imports: [FormsModule, Spinner],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly router = inject(Router);
  private readonly interviewService = inject(InterviewService);
  private readonly state = inject(InterviewStateService);

  readonly skills = SKILLS;
  readonly selectedSkill = signal<string>('');
  readonly loading = signal<boolean>(false);
  readonly error = signal<string>('');

  onSkillChange(skill: string): void {
    this.selectedSkill.set(skill);
    this.error.set('');
  }

  startInterview(): void {
    if (!this.selectedSkill()) {
      this.error.set('Please select a skill to continue.');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.state.reset();

    this.interviewService
      .generateQuestion({ skill: this.selectedSkill() })
      .subscribe({
        next: (response) => {
          this.state.setSkill(this.selectedSkill());
          this.state.setQuestion(response);
          this.loading.set(false);
          this.router.navigate(['/interview']);
        },
        error: (err: Error) => {
          this.error.set(err.message);
          this.loading.set(false);
        },
      });
  }
}
