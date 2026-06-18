import { Component, input, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChatMessage } from '../../../models/chat.model';

@Component({
  selector: 'app-chat-bubble',
  imports: [DatePipe],
  templateUrl: './chat-bubble.html',
  styleUrl: './chat-bubble.css',
})
export class ChatBubble {
  message = input.required<ChatMessage>();

  readonly isUser = computed(() => this.message().role === 'user');
  readonly isEvaluation = computed(() => this.message().type === 'evaluation');
  readonly isQuestion = computed(() => this.message().type === 'question');
  readonly hasScore = computed(
    () => this.message().metadata?.score !== undefined
  );

  get scoreColor(): string {
    const score = this.message().metadata?.score ?? 0;
    if (score >= 8) return 'excellent';
    if (score >= 6) return 'good';
    if (score >= 4) return 'average';
    return 'poor';
  }
}
