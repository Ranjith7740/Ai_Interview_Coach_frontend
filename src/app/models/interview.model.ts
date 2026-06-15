export interface QuestionRequest {
  skill: string;
}

export interface QuestionResponse {
  questionId: string;
  question: string;
  skill: string;
}

export interface EvaluateRequest {
  questionId: string;
  question: string;
  answer: string;
  skill: string;
}

export interface EvaluateResponse {
  score: number;
  feedback: string;
  improvements: string[];
  skill: string;
}

export const SKILLS = ['Java', 'Spring', 'SQL', 'Angular'] as const;
export type Skill = (typeof SKILLS)[number];
