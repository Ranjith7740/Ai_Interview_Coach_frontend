import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { ApiResponse } from '../core/models/api-response.model';
import { Recommendation, Priority } from '../models/recommendation.model';

@Injectable({ providedIn: 'root' })
export class RecommendationService {
  private readonly http = inject(HttpClient);

  private mapPriority(priority: number): Priority {
    switch (priority) {
      case 1:
        return 'high';
      case 2:
        return 'medium';
      case 3:
        return 'low';
      default:
        return 'low';
    }
  }

  getRecommendations(): Observable<Recommendation[]> {
    return this.http
      .get<ApiResponse<any[]>>(API_ENDPOINTS.RECOMMENDATIONS)
      .pipe(
        map((r) =>
          r.data.map((item) => ({
            id: item.id,
            targetSkill: item.targetSkill,
            title: item.title,
            content: item.content,
            priority: this.mapPriority(item.priority),
          }))
        )
      );
  }
}