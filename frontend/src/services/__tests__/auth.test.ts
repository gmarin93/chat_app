import MockAdapter from 'axios-mock-adapter';
import apiClient from '../api';
import { authService } from '../auth';
import { LoginCredentials, AuthResponse } from '@/types/login';

// Create mock adapter
const mock = new MockAdapter(apiClient);

describe('AuthService', () => {
  afterEach(() => {
    mock.reset();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      // Arrange
      const credentials: LoginCredentials = {
        username: 'testuser',
        password: 'password123',
      };

      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
        },
        token: 'mock-jwt-token',
      };

      // Mock the API call
      mock.onPost('/api/auth/login/').reply(200, mockResponse);

      // Act
      const result = await authService.login(credentials);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(result.user.username).toBe('testuser');
      expect(result.token).toBe('mock-jwt-token');
    });

    it('should throw error with invalid credentials', async () => {
      // Arrange
      const credentials: LoginCredentials = {
        username: 'wronguser',
        password: 'wrongpassword',
      };

      mock.onPost('/api/auth/login/').reply(401, {
        message: 'Invalid credentials',
      });

      // Act & Assert
      await expect(authService.login(credentials)).rejects.toThrow();
    });

    it('should handle network errors', async () => {
      // Arrange
      const credentials: LoginCredentials = {
        username: 'testuser',
        password: 'password123',
      };

      mock.onPost('/api/auth/login/').networkError();

      // Act & Assert
      await expect(authService.login(credentials)).rejects.toThrow('Network Error');
    });

    it('should handle server errors (500)', async () => {
      // Arrange
      const credentials: LoginCredentials = {
        username: 'testuser',
        password: 'password123',
      };

      mock.onPost('/api/auth/login/').reply(500, {
        message: 'Internal server error',
      });

      // Act & Assert
      await expect(authService.login(credentials)).rejects.toThrow();
    });
  });

  describe('logout', () => {
    it('should call logout endpoint', async () => {
      // Arrange
      mock.onPost('/api/auth/logout/').reply(200);

      // Act
      await authService.logout();

      // Assert
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].url).toBe('/api/auth/logout/');
    });
  });

  describe('getCurrentUser', () => {
    it('should fetch current user', async () => {
      // Arrange
      const mockUser = {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
      };

      mock.onGet('/api/auth/me/').reply(200, mockUser);

      // Act
      const result = await authService.getCurrentUser();

      // Assert
      expect(result).toEqual(mockUser);
    });
  });
});
