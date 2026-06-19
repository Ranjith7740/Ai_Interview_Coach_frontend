import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { ApiResponse, PagedData } from '../core/models/api-response.model';
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

  getInterviews(): Observable<ApiResponse<PagedData<InterviewSummary>>> {
  return this.http.get<ApiResponse<PagedData<InterviewSummary>>>(
    API_ENDPOINTS.INTERVIEWS
  );
}

  getInterviewById(id: string): Observable<InterviewDetail> {
    return this.http
      .get<ApiResponse<InterviewDetail>>(API_ENDPOINTS.INTERVIEW_BY_ID(id))
      .pipe(map((r) => r.data));
  }
}
