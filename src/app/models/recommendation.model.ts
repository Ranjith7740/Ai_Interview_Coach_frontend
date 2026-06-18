export type Priority = 'high' | 'medium' | 'low';
export type ResourceType = 'article' | 'video' | 'practice' | 'course';

export interface Resource {
  title: string;
  url: string;
  type: ResourceType;
}

export interface Recommendation {
  id: string;
  skill: string;
  title: string;
  description: string;
  priority: Priority;
  estimatedTime: string;
  resources: Resource[];
}

export interface StudyPlan {
  weeklyGoal: number;
  focusSkill: string;
  recommendations: Recommendation[];
  generatedAt: string;
}
