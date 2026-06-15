export interface DashboardStats {
  totalInterviews: number;
  averageScore: number;
  bestSkill: string;
  weakestSkill: string;
}

export interface TrendPoint {
  date: string;
  score: number;
}

export type ScoreTrend = TrendPoint[];
