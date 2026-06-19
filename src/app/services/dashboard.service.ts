import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { ApiResponse } from '../core/models/api-response.model';
import { DashboardStats, ScoreTrend, TrendPoint } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);

  getStats(): Observable<DashboardStats> {
    return this.http
      .get<ApiResponse<DashboardStats>>(API_ENDPOINTS.DASHBOARD_STATS)
      .pipe(map((r) => r.data));
  }

  getTrend(): Observable<ScoreTrend> {
    return this.http
      .get<ApiResponse<Array<{ date: string; averageScore: number }>>>(API_ENDPOINTS.DASHBOARD_TREND)
      .pipe(
        map((r) =>
          r.data.map<TrendPoint>((p) => ({ date: p.date, score: p.averageScore }))
        )
      );
  }
}
