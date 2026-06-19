export interface InterviewSummary {
  id: string;
  skill: string;
  score: number;
  createdAt: string;
}

export interface InterviewDetail extends InterviewSummary {
  question: string;
  answer: string;
  feedback: string;
  improvementSuggestions?: string;
}
