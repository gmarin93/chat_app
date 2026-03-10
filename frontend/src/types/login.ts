// TypeScript interfaces
export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface AuthState {
    // State
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  
    // Actions
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    clearError: () => void;
  }

  export interface RegisterData {
    username: string;
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    user: {
      id: string;
      username: string;
      email: string;
      avatar?: string;
    };
    token: string;
  }