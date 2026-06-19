export type MessageRole = 'user' | 'assistant';
export type MessageType = 'text' | 'question' | 'evaluation' | 'info';

export interface MessageMetadata {
  score?: number;
  skill?: string;
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
  skill?: string;
}

export interface QuestionData {
  question?: string;
}

export interface EvaluationData {
  score?: number;
  feedback?: string;
}

export interface ChatResponse {
  sessionId: string;
  message: string;
  intent?: string;
  agentsUsed?: string[];
  questionData?: QuestionData;
  evaluationData?: EvaluationData;
}

export interface AgentSession {
  id: string;
  title: string;
  createdAt: string;
}
