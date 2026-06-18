export type MessageRole = 'user' | 'assistant';
export type MessageType = 'text' | 'question' | 'evaluation' | 'info';

export interface MessageMetadata {
  score?: number;
  skill?: string;
  questionId?: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  type: MessageType;
  timestamp: string;
  metadata?: MessageMetadata;
}

export interface ChatRequest {
  sessionId: string;
  message: string;
}

export interface ChatResponse {
  sessionId: string;
  message: string;
  type: MessageType;
  metadata?: MessageMetadata;
}

export interface AgentSession {
  id: string;
  title: string;
  createdAt: string;
}
