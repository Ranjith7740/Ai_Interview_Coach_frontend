import { Injectable, signal, computed } from '@angular/core';
import { QuestionResponse, EvaluateResponse } from '../models/interview.model';

@Injectable({ providedIn: 'root' })
export class InterviewStateService {
  private readonly _selectedSkill = signal<string>('');
  private readonly _currentQuestion = signal<QuestionResponse | null>(null);
  private readonly _currentResult = signal<EvaluateResponse | null>(null);

  readonly selectedSkill = this._selectedSkill.asReadonly();
  readonly currentQuestion = this._currentQuestion.asReadonly();
  readonly currentResult = this._currentResult.asReadonly();

  readonly hasActiveInterview = computed(() => this._currentQuestion() !== null);
  readonly hasResult = computed(() => this._currentResult() !== null);

  setSkill(skill: string): void {
    this._selectedSkill.set(skill);
  }

  setQuestion(question: QuestionResponse): void {
    this._currentQuestion.set(question);
  }

  setResult(result: EvaluateResponse): void {
    this._currentResult.set(result);
  }

  reset(): void {
    this._selectedSkill.set('');
    this._currentQuestion.set(null);
    this._currentResult.set(null);
  }
}
