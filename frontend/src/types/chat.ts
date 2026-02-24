export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface CareerPredictionResponse {
  strengths: string;
  weaknesses: string;
  careerPaths: string;
  advice: string;
}
