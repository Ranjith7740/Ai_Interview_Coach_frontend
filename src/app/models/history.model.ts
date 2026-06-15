export interface InterviewSummary {
  id: string;
  skill: string;
  score: number;
  date: string;
}

export interface InterviewDetail extends InterviewSummary {
  question: string;
  answer: string;
  feedback: string;
  improvements: string[];
}
