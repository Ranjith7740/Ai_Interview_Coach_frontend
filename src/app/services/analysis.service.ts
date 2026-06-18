import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { WeakArea } from '../models/progress.model';

@Injectable({ providedIn: 'root' })
export class AnalysisService {
  private readonly http = inject(HttpClient);

  getWeakAreas(): Observable<WeakArea[]> {
    return this.http.get<WeakArea[]>(API_ENDPOINTS.WEAK_AREAS);
  }
}
