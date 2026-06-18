import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { ProgressData } from '../models/progress.model';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly http = inject(HttpClient);

  getProgress(): Observable<ProgressData> {
    return this.http.get<ProgressData>(API_ENDPOINTS.PROGRESS);
  }
}
