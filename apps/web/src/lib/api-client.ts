import type { 
  RegisterInput, 
  LoginInput, 
  CreateSleepLogInput,
  CreateHormoneTestInput,
  CreateWorkoutSessionInput,
  User,
  SleepLog,
  HormoneTest,
  WorkoutSession,
  WeeklyStats
} from '@alphavital/types';

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
    
    // Récupérer le token depuis localStorage si disponible
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.message || 'Erreur inconnue' };
      }

      return { success: true, data: result.data };
    } catch (error) {
      console.error('API request error:', error);
      return { success: false, error: 'Erreur de connexion' };
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  // Auth endpoints
  async register(data: RegisterInput) {
    const result = await this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (result.success && result.data) {
      this.setToken(result.data.token);
    }

    return result;
  }

  async login(data: LoginInput) {
    const result = await this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (result.success && result.data) {
      this.setToken(result.data.token);
    }

    return result;
  }

  async logout() {
    this.clearToken();
    return { success: true };
  }

  // User endpoints
  async getMe() {
    return this.request<User>('/me');
  }

  async updateProfile(data: Partial<User>) {
    return this.request<User>('/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Sleep endpoints
  async createSleepLog(data: CreateSleepLogInput) {
    return this.request<SleepLog>('/sleep/logs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSleepLogs(limit = 30, offset = 0) {
    return this.request<SleepLog[]>(`/sleep/logs?limit=${limit}&offset=${offset}`);
  }

  // Hormone test endpoints
  async createHormoneTest(data: CreateHormoneTestInput) {
    return this.request<HormoneTest & { recommendations: Record<string, string[]> }>('/hormone-tests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getHormoneTests() {
    return this.request<HormoneTest[]>('/hormone-tests');
  }

  // Workout endpoints
  async createWorkoutSession(data: CreateWorkoutSessionInput) {
    return this.request<WorkoutSession>('/workouts/sessions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getWorkoutSessions(limit = 20, offset = 0) {
    return this.request<WorkoutSession[]>(`/workouts/sessions?limit=${limit}&offset=${offset}`);
  }

  // Stats endpoints
  async getWeeklyStats() {
    return this.request<WeeklyStats>('/stats/weekly');
  }

  // Badge endpoints
  async getBadges() {
    return this.request<any[]>('/badges');
  }

  // Journal endpoints
  async createJournalEntry(data: { mood?: number; energy?: number; text?: string }) {
    return this.request<any>('/journal/entries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getJournalEntries(limit = 30, offset = 0) {
    return this.request<any[]>(`/journal/entries?limit=${limit}&offset=${offset}`);
  }
}

export const apiClient = new ApiClient();
export default apiClient;