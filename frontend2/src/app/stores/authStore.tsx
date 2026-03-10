import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '@/services/auth';
import { AuthState, LoginCredentials } from '@/types/login';



export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        try {
          // ✅ Call service (clean separation)
          const { user, token } = await authService.login(credentials);

          console.log("user:", user, "token:", token);

          // ✅ Only manage state here
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Login failed',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          // ✅ Call service
          await authService.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // Clear state regardless
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);