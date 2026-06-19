import { TrendPoint } from './dashboard.model';

export interface SkillStat {
  skill: string;
  avgScore: number;
  totalAttempts: number;
}

export interface ProgressData {
  totalSessions: number;
  overallAvgScore: number;
  skillStats: SkillStat[];
  scoreTrend: TrendPoint[];
}

export interface WeakArea {
  skill: string;
  avgScore: number;
  totalAttempts: number;
  trend?: string;
}
