import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '../authStore';
import { authService } from '@/services/auth';
import { AuthResponse } from '@/types/login';

// Mock the auth service
jest.mock('@/services/auth');

const mockAuthService = authService as jest.Mocked<typeof authService>;

describe('useAuthStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.logout();
    });
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useAuthStore());

      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe('login', () => {
    it('should set loading state while logging in', async () => {
      const { result } = renderHook(() => useAuthStore());

      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
        },
        token: 'mock-jwt-token',
      };

      mockAuthService.login.mockImplementation(() => {
        // Check loading state during async operation
        const store = useAuthStore.getState();
        expect(store.isLoading).toBe(true);
        return Promise.resolve(mockResponse);
      });

      await act(async () => {
        await result.current.login({
          username: 'testuser',
          password: 'password123',
        });
      });
    });

    it('should update state on successful login', async () => {
      const { result } = renderHook(() => useAuthStore());

      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
        },
        token: 'mock-jwt-token',
      };

      mockAuthService.login.mockResolvedValue(mockResponse);

      await act(async () => {
        await result.current.login({
          username: 'testuser',
          password: 'password123',
        });
      });

      // Assert final state
      expect(result.current.user).toEqual(mockResponse.user);
      expect(result.current.token).toBe('mock-jwt-token');
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should handle login errors', async () => {
      const { result } = renderHook(() => useAuthStore());

      const mockError = {
        response: {
          data: {
            message: 'Invalid credentials',
          },
        },
      };

      mockAuthService.login.mockRejectedValue(mockError);

      await act(async () => {
        try {
          await result.current.login({
            username: 'wronguser',
            password: 'wrongpassword',
          });
        } catch (error) {
          // Expected to throw
        }
      });

      // Assert error state
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('Invalid credentials');
    });

    it('should handle generic errors without response', async () => {
      const { result } = renderHook(() => useAuthStore());

      mockAuthService.login.mockRejectedValue(new Error('Network error'));

      await act(async () => {
        try {
          await result.current.login({
            username: 'testuser',
            password: 'password123',
          });
        } catch (error) {
          // Expected to throw
        }
      });

      expect(result.current.error).toBe('Login failed');
      expect(result.current.isLoading).toBe(false);
    });

    it('should call authService.login with correct credentials', async () => {
      const { result } = renderHook(() => useAuthStore());

      const credentials = {
        username: 'testuser',
        password: 'password123',
      };

      mockAuthService.login.mockResolvedValue({
        user: { id: '1', username: 'testuser', email: 'test@example.com' },
        token: 'token',
      });

      await act(async () => {
        await result.current.login(credentials);
      });

      expect(mockAuthService.login).toHaveBeenCalledWith(credentials);
      expect(mockAuthService.login).toHaveBeenCalledTimes(1);
    });
  });

  describe('logout', () => {
    it('should clear state on logout', async () => {
      const { result } = renderHook(() => useAuthStore());

      // First login
      mockAuthService.login.mockResolvedValue({
        user: { id: '1', username: 'testuser', email: 'test@example.com' },
        token: 'mock-token',
      });

      await act(async () => {
        await result.current.login({
          username: 'testuser',
          password: 'password123',
        });
      });

      // Verify logged in
      expect(result.current.isAuthenticated).toBe(true);

      // Now logout
      mockAuthService.logout.mockResolvedValue();

      await act(async () => {
        await result.current.logout();
      });

      // Verify state is cleared
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should clear state even if logout API fails', async () => {
      const { result } = renderHook(() => useAuthStore());

      // First login
      mockAuthService.login.mockResolvedValue({
        user: { id: '1', username: 'testuser', email: 'test@example.com' },
        token: 'mock-token',
      });

      await act(async () => {
        await result.current.login({
          username: 'testuser',
          password: 'password123',
        });
      });

      // Logout fails
      mockAuthService.logout.mockRejectedValue(new Error('Server error'));

      await act(async () => {
        await result.current.logout();
      });

      // State should still be cleared
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('clearError', () => {
    it('should clear error message', async () => {
      const { result } = renderHook(() => useAuthStore());

      // Set an error
      mockAuthService.login.mockRejectedValue({
        response: { data: { message: 'Some error' } },
      });

      await act(async () => {
        try {
          await result.current.login({
            username: 'test',
            password: 'test',
          });
        } catch (e) {}
      });

      expect(result.current.error).toBe('Some error');

      // Clear error
      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
    });
  });
});
