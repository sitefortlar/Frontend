// Mock JWT token generator
const generateMockToken = (userId: string): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ 
    userId, 
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    iat: Date.now()
  }));
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
};

// Mock credentials validation
const validateCredentials = (email: string, password: string): boolean => {
  // Mock validation - accept any email/password for demo
  return email && password && email.includes('@');
};

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!validateCredentials(credentials.email, credentials.password)) {
          reject(new Error('Credenciais inválidas'));
          return;
        }

        const userId = `user_${Date.now()}`;
        const token = generateMockToken(userId);
        
        const response: LoginResponse = {
          token,
          user: {
            id: userId,
            email: credentials.email,
            name: credentials.email.split('@')[0],
          }
        };

        // Save token to localStorage
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_id', userId);

        resolve(response);
      }, 1000); // Simulate network delay
    });
  },

  async logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_id');
        resolve();
      }, 500);
    });
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  isTokenValid(token?: string): boolean {
    const tokenToCheck = token || this.getToken();
    if (!tokenToCheck) return false;

    try {
      const parts = tokenToCheck.split('.');
      if (parts.length !== 3) return false;

      const payload = JSON.parse(atob(parts[1]));
      const now = Date.now();
      
      // Check if token is expired
      if (payload.exp && payload.exp < now) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  },

  getCurrentUserId(): string | null {
    return localStorage.getItem('user_id');
  }
};
