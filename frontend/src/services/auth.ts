import apiClient from './api';
import { LoginCredentials, RegisterData, AuthResponse } from '@/types/login';
import { ACCOUNTS_ENDPOINTS } from '@/config/endpoints';



class AuthService {
    /**
     * Login user
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>(
            ACCOUNTS_ENDPOINTS.LOGIN,
            credentials
        );
        console.log("response:", response.data);
        return response.data;
    }

    /**
     * Register new user
     */
    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>(
            ACCOUNTS_ENDPOINTS.REGISTER,
            data
        );
        return response.data;
    }

    /**
     * Logout user
     */
    async logout(): Promise<void> {
        // Optional: Call backend to invalidate token
        await apiClient.post(ACCOUNTS_ENDPOINTS.LOGOUT);
    }

    /**
     * Get current user profile
     */
    async getCurrentUser(): Promise<AuthResponse['user']> {
        const response = await apiClient.get<AuthResponse['user']>(
            ACCOUNTS_ENDPOINTS.USER
        );
        return response.data;
    }

    /**
     * Refresh token
     */
    async refreshToken(refreshToken: string): Promise<{ token: string }> {
        const response = await apiClient.post<{ token: string }>(
            ACCOUNTS_ENDPOINTS.REFRESH,
            { refresh: refreshToken }
        );
        return response.data;
    }
}

// Export singleton instance
export default new AuthService();