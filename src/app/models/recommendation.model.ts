export type Priority = 'high' | 'medium' | 'low';

export interface Recommendation {
  id: number;
  targetSkill: string;
  title: string;
  content: string;
  priority: Priority;
}
