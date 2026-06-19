import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { ApiResponse } from '../core/models/api-response.model';
import { ChatRequest, ChatResponse } from '../models/chat.model';

@Injectable({ providedIn: 'root' })
export class AgentService {
  private readonly http = inject(HttpClient);

  chat(request: ChatRequest): Observable<ChatResponse> {
    return this.http
      .post<ApiResponse<ChatResponse>>(API_ENDPOINTS.AGENT_CHAT, request)
      .pipe(map((r) => r.data));
  }

  getHistory(sessionId: string): Observable<Array<{ role: string; message: string }>> {
    return this.http
      .get<ApiResponse<Array<{ role: string; message: string }>>>(
        API_ENDPOINTS.AGENT_HISTORY(sessionId)
      )
      .pipe(map((r) => r.data));
  }
}
