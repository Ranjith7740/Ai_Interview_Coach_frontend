export const API_ENDPOINTS = {
  // Original interview flow
  QUESTION: '/api/interview/question',
  EVALUATE: '/api/interview/evaluate',
  INTERVIEWS: '/api/interviews',
  INTERVIEW_BY_ID: (id: string) => `/api/interviews/${id}`,
  DASHBOARD_STATS: '/api/dashboard/stats',
  DASHBOARD_TREND: '/api/dashboard/trend',

  // AI Agent
  AGENT_CHAT: '/api/agent/chat',
  AGENT_HISTORY: (sessionId: string) => `/api/agent/history/${sessionId}`,

  // Analysis & Progress
  WEAK_AREAS: '/api/analysis/weak-areas',
  PROGRESS: '/api/progress',

  // Recommendations
  RECOMMENDATIONS: '/api/recommendations',
} as const;
