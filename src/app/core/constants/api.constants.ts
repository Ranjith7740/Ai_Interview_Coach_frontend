export const API_ENDPOINTS = {
  QUESTION: '/api/interview/question',
  EVALUATE: '/api/interview/evaluate',
  INTERVIEWS: '/api/interviews',
  INTERVIEW_BY_ID: (id: string) => `/api/interviews/${id}`,
  DASHBOARD_STATS: '/api/dashboard/stats',
  DASHBOARD_TREND: '/api/dashboard/trend',
} as const;
