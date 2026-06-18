import { Injectable, signal, computed } from '@angular/core';
import { ChatMessage, ChatResponse, AgentSession } from '../models/chat.model';

@Injectable({ providedIn: 'root' })
export class ChatStateService {
  private readonly _sessionId = signal<string>(this.makeId());
  private readonly _messages = signal<ChatMessage[]>([]);
  private readonly _isThinking = signal<boolean>(false);
  private readonly _sessions = signal<AgentSession[]>([]);
  private readonly _sidebarOpen = signal<boolean>(true);

  readonly sessionId = this._sessionId.asReadonly();
  readonly messages = this._messages.asReadonly();
  readonly isThinking = this._isThinking.asReadonly();
  readonly sessions = this._sessions.asReadonly();
  readonly sidebarOpen = this._sidebarOpen.asReadonly();

  readonly hasMessages = computed(() => this._messages().length > 0);
  readonly messageCount = computed(() => this._messages().length);

  addUserMessage(content: string): void {
    const msg: ChatMessage = {
      id: this.makeId(),
      role: 'user',
      content,
      type: 'text',
      timestamp: new Date().toISOString(),
    };
    this._messages.update((msgs) => [...msgs, msg]);
    this._isThinking.set(true);
  }

  addAssistantMessage(response: ChatResponse): void {
    const msg: ChatMessage = {
      id: this.makeId(),
      role: 'assistant',
      content: response.message,
      type: response.type,
      timestamp: new Date().toISOString(),
      metadata: response.metadata,
    };
    this._messages.update((msgs) => [...msgs, msg]);
    this._isThinking.set(false);
  }

  setError(): void {
    this._isThinking.set(false);
  }

  loadMessages(messages: ChatMessage[]): void {
    this._messages.set(messages);
    this._isThinking.set(false);
  }

  newSession(): void {
    if (this.hasMessages()) {
      const firstMsg = this._messages()[0];
      const session: AgentSession = {
        id: this._sessionId(),
        title: firstMsg.content.length > 45
          ? firstMsg.content.slice(0, 45) + '…'
          : firstMsg.content,
        createdAt: new Date().toISOString(),
      };
      this._sessions.update((s) => [session, ...s.slice(0, 19)]);
    }
    this._sessionId.set(this.makeId());
    this._messages.set([]);
    this._isThinking.set(false);
  }

  toggleSidebar(): void {
    this._sidebarOpen.update((v) => !v);
  }

  private makeId(): string {
    return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }
  setSessionId(id: string): void {
  this._sessionId.set(id);
}
}
