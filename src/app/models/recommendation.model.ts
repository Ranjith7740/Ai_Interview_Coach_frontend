export type Priority = 'high' | 'medium' | 'low';

export interface Recommendation {
  id: string;
  targetSkill: string;
  title: string;
  content: string;
  priority: Priority;
}
