import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InterviewService } from '../../services/interview.service';
import { InterviewStateService } from '../../state/interview-state.service';
import { Spinner } from '../../shared/components/spinner/spinner';

@Component({
  selector: 'app-interview',
  imports: [FormsModule, Spinner],
  templateUrl: './interview.html',
  styleUrl: './interview.css',
})
export class Interview implements OnInit {
  private readonly router = inject(Router);
  private readonly interviewService = inject(InterviewService);
  readonly state = inject(InterviewStateService);

  readonly answer = signal<string>('');
  readonly loading = signal<boolean>(false);
  readonly error = signal<string>('');

  ngOnInit(): void {
    if (!this.state.hasActiveInterview()) {
      this.router.navigate(['/home']);
    }
  }

  onAnswerChange(value: string): void {
    this.answer.set(value);
    this.error.set('');
  }

  get wordCount(): number {
    return this.answer()
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
  }

  submitAnswer(): void {
    const question = this.state.currentQuestion();
    if (!question) return;

    if (!this.answer().trim()) {
      this.error.set('Please write your answer before submitting.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.interviewService
      .evaluateAnswer({
        questionId: question.questionId,
        question: question.question,
        answer: this.answer(),
        skill: question.skill,
      })
      .subscribe({
        next: (result) => {
          this.state.setResult(result);
          this.loading.set(false);
          this.router.navigate(['/result']);
        },
        error: (err: Error) => {
          this.error.set(err.message);
          this.loading.set(false);
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
