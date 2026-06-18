import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { ChatRequest, ChatResponse, ChatMessage } from '../models/chat.model';

@Injectable({ providedIn: 'root' })
export class AgentService {
  private readonly http = inject(HttpClient);

  chat(request: ChatRequest): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(API_ENDPOINTS.AGENT_CHAT, request);
  }

  getHistory(sessionId: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(API_ENDPOINTS.AGENT_HISTORY(sessionId));
  }
}
