import { TrendPoint } from './dashboard.model';

export interface ProgressData {
  trend: TrendPoint[];
  totalSessions: number;
  improvement: number;
  currentStreak: number;
}

export interface WeakArea {
  skill: string;
  averageScore: number;
  attempts: number;
  suggestion: string;
}
