import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { ApiResponse } from '../core/models/api-response.model';
import { ProgressData } from '../models/progress.model';
import { TrendPoint } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly http = inject(HttpClient);

  getProgress(): Observable<ProgressData> {
    return this.http
      .get<ApiResponse<any>>(API_ENDPOINTS.PROGRESS)
      .pipe(
        map((r) => {
          const d = r.data;
          const scoreTrend: TrendPoint[] = (d.scoreTrend ?? []).map(
            (p: { date: string; averageScore: number }) => ({
              date: p.date,
              score: p.averageScore,
            })
          );
          return { ...d, scoreTrend } as ProgressData;
        })
      );
  }
}
