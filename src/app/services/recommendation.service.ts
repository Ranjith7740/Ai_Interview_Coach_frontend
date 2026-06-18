import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { StudyPlan } from '../models/recommendation.model';

@Injectable({ providedIn: 'root' })
export class RecommendationService {
  private readonly http = inject(HttpClient);

  getStudyPlan(): Observable<StudyPlan> {
    return this.http.get<StudyPlan>(API_ENDPOINTS.RECOMMENDATIONS);
  }
}
