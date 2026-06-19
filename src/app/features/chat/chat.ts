import {
  Component,
  inject,
  signal,
  viewChild,
  ElementRef,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgentService } from '../../services/agent.service';
import { ChatStateService } from '../../state/chat-state.service';
import { ChatBubble } from '../../shared/components/chat-bubble/chat-bubble';
import { ChatResponse } from '../../models/chat.model';
import { ChatMessage } from '../../models/chat.model';

const SUGGESTIONS = [
  'Start a Java interview',
  'Practice Spring Boot questions',
  'Test my SQL knowledge',
  'Prepare for Angular interview',
] as const;

@Component({
  selector: 'app-chat',
  imports: [FormsModule, ChatBubble],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  private readonly agentService = inject(AgentService);
  readonly chatState = inject(ChatStateService);
  readonly sessionId = signal<string>('');

  setSessionId(id: string): void {
    this.sessionId.set(id);
  }

  private readonly messagesContainer =
    viewChild<ElementRef<HTMLDivElement>>('messagesContainer');

  readonly inputText = signal<string>('');
  readonly suggestions = SUGGESTIONS;

  constructor() {
    // Auto-scroll to bottom whenever messages or thinking state changes
    effect(() => {
      void this.chatState.messages();
      void this.chatState.isThinking();
      Promise.resolve().then(() => {
        const el = this.messagesContainer()?.nativeElement;
        if (el) el.scrollTop = el.scrollHeight;
      });
    });
  }

  send(): void {
    const text = this.inputText().trim();
    if (!text || this.chatState.isThinking()) return;

    this.inputText.set('');
    this.resetTextarea();
    this.chatState.addUserMessage(text);

    this.agentService
      .chat({ sessionId: this.chatState.sessionId(), message: text })
      .subscribe({
        next: (response: ChatResponse) => {
          if (response.sessionId) {
            this.chatState.setSessionId(response.sessionId);
          }
          const displayText =
            response.questionData?.question ?? response.message ?? '';
          this.chatState.addAssistantMessage({ ...response, message: displayText });
        },
        error: () => {
          this.chatState.setError();
        },
      });
  }

  sendSuggestion(text: string): void {
    this.inputText.set(text);
    this.send();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  onInput(event: Event): void {
    const el = event.target as HTMLTextAreaElement;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }

  newChat(): void {
    this.chatState.newSession();
  }

  loadSession(sessionId: string): void {
    this.agentService.getHistory(sessionId).subscribe({
      next: (messages: Array<{ role: string; message: string }>) => {
        const formattedMessages: ChatMessage[] = messages.map((msg, index) => {
          // Determine message type based on whether it's user or assistant
          const isUser = msg.role === 'user';
          
          return {
            id: `hist-${sessionId}-${index}-${Date.now()}`,
            role: isUser ? 'user' : 'assistant',
            content: msg.message, // Mapping the raw 'message' string to 'content'
            type: isUser ? 'text' : 'question', // Or match your business logic types
            timestamp: new Date().toISOString(),
            metadata: {} 
          };
        });

        this.chatState.loadMessages(formattedMessages);
      },
      error: (err) => {
        console.error('Failed to load session history:', err);
      }
    });
  }

  private resetTextarea(): void {
    // Reset height after clearing
    Promise.resolve().then(() => {
      const textarea = document.querySelector<HTMLTextAreaElement>('.chat-input__textarea');
      if (textarea) textarea.style.height = 'auto';
    });
  }
}
