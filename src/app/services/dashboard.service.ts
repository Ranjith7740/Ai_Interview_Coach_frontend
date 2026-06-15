import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { DashboardStats, ScoreTrend } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(API_ENDPOINTS.DASHBOARD_STATS);
  }

  getTrend(): Observable<ScoreTrend> {
    return this.http.get<ScoreTrend>(API_ENDPOINTS.DASHBOARD_TREND);
  }
}
