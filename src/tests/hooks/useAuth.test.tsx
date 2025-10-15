import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/useAuth';
import { authService } from '@/services/auth/AuthService';

// Mock do authService
vi.mock('@/services/auth/AuthService', () => ({
  authService: {
    getCurrentUserFromStorage: vi.fn(),
    isAuthenticated: vi.fn(),
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    forgotPassword: vi.fn(),
    resetPassword: vi.fn(),
    updateProfile: vi.fn(),
    changePassword: vi.fn(),
  },
}));

// Mock do react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return user data when authenticated', async () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
    
    vi.mocked(authService.getCurrentUserFromStorage).mockReturnValue(mockUser);
    vi.mocked(authService.isAuthenticated).mockReturnValue(true);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });
  });

  it('should handle login successfully', async () => {
    const mockCredentials = { email: 'test@example.com', password: 'password123' };
    const mockResponse = {
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
      token: 'mock-token',
    };

    vi.mocked(authService.login).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await result.current.signIn(mockCredentials);

    expect(authService.login).toHaveBeenCalledWith(mockCredentials);
  });

  it('should handle login error', async () => {
    const mockCredentials = { email: 'test@example.com', password: 'wrongpassword' };
    const mockError = new Error('Invalid credentials');

    vi.mocked(authService.login).mockRejectedValue(mockError);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await expect(result.current.signIn(mockCredentials)).rejects.toThrow('Invalid credentials');
  });

  it('should handle registration successfully', async () => {
    const mockCompanyData = {
      cnpj: '12.345.678/0001-99',
      razaoSocial: 'Test Company',
      nomeFantasia: 'Test',
      email: 'test@example.com',
      telefone: '(11) 99999-9999',
      cep: '01234-567',
      logradouro: 'Test Street',
      numero: '123',
      bairro: 'Test District',
      cidade: 'Test City',
      uf: 'SP',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    };

    const mockResponse = {
      user: { id: '1', name: 'Test Company', email: 'test@example.com' },
      token: 'mock-token',
      message: 'Company registered successfully',
    };

    vi.mocked(authService.register).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await result.current.signUp(mockCompanyData);

    expect(authService.register).toHaveBeenCalledWith(mockCompanyData);
  });

  it('should handle logout', async () => {
    vi.mocked(authService.logout).mockResolvedValue();

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    result.current.signOut();

    await waitFor(() => {
      expect(authService.logout).toHaveBeenCalled();
    });
  });

  it('should handle forgot password', async () => {
    const mockEmail = 'test@example.com';
    const mockResponse = { message: 'Password reset email sent', success: true };

    vi.mocked(authService.forgotPassword).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await result.current.forgotPassword(mockEmail);

    expect(authService.forgotPassword).toHaveBeenCalledWith(mockEmail);
  });

  it('should handle reset password', async () => {
    const mockToken = 'reset-token';
    const mockPassword = 'NewPassword123!';
    const mockResponse = { message: 'Password reset successfully', success: true };

    vi.mocked(authService.resetPassword).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await result.current.resetPassword(mockToken, mockPassword);

    expect(authService.resetPassword).toHaveBeenCalledWith(mockToken, mockPassword);
  });
});
