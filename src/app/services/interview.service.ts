import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import {
  QuestionRequest,
  QuestionResponse,
  EvaluateRequest,
  EvaluateResponse,
} from '../models/interview.model';
import { InterviewSummary, InterviewDetail } from '../models/history.model';

@Injectable({ providedIn: 'root' })
export class InterviewService {
  private readonly http = inject(HttpClient);

  generateQuestion(request: QuestionRequest): Observable<QuestionResponse> {
    return this.http.post<QuestionResponse>(API_ENDPOINTS.QUESTION, request);
  }

  evaluateAnswer(request: EvaluateRequest): Observable<EvaluateResponse> {
    return this.http.post<EvaluateResponse>(API_ENDPOINTS.EVALUATE, request);
  }

  getInterviews(): Observable<InterviewSummary[]> {
    return this.http.get<InterviewSummary[]>(API_ENDPOINTS.INTERVIEWS);
  }

  getInterviewById(id: string): Observable<InterviewDetail> {
    return this.http.get<InterviewDetail>(API_ENDPOINTS.INTERVIEW_BY_ID(id));
  }
}
