import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { ApiResponse } from '../core/models/api-response.model';
import { Recommendation } from '../models/recommendation.model';

@Injectable({ providedIn: 'root' })
export class RecommendationService {
  private readonly http = inject(HttpClient);

  getRecommendations(): Observable<Recommendation[]> {
    return this.http
      .get<ApiResponse<Recommendation[]>>(API_ENDPOINTS.RECOMMENDATIONS)
      .pipe(map((r) => r.data));
  }
}
