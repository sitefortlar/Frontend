import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { authService } from '@/services/auth/AuthService';
import { queryKeys } from '@/config/queryClient';
import { LoginFormData, CompanyRegistrationFormData } from '@/schemas';
import { User } from '@/types/Auth';

/**
 * Hook para gerenciar autenticação
 * Aplicando Single Responsibility Principle
 */
export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Query para obter dados do usuário atual
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: queryKeys.auth.user,
    queryFn: () => {
      const userData = authService.getCurrentUserFromStorage();
      if (!userData || !authService.isAuthenticated()) {
        throw new Error('Usuário não autenticado');
      }
      return userData;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: false,
  });

  // Mutation para login
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginFormData) => authService.login(credentials),
    onSuccess: (data) => {
      // Atualiza o cache com os dados do usuário
      queryClient.setQueryData(queryKeys.auth.user, data.user);
      
      // Navega para a página principal
      navigate('/catalog');
    },
    onError: (error) => {
      console.error('Erro no login:', error);
    },
  });

  // Mutation para registro
  const registerMutation = useMutation({
    mutationFn: (companyData: CompanyRegistrationFormData) => authService.register(companyData),
    onSuccess: (data) => {
      // Atualiza o cache com os dados do usuário
      queryClient.setQueryData(queryKeys.auth.user, data.user);
      
      // Navega para a página principal
      navigate('/catalog');
    },
    onError: (error) => {
      console.error('Erro no registro:', error);
    },
  });

  // Mutation para logout
  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Limpa todos os caches
      queryClient.clear();
      
      // Navega para a página de login
      navigate('/login');
    },
    onError: (error) => {
      console.error('Erro no logout:', error);
      // Mesmo com erro, limpa os dados locais
      queryClient.clear();
      navigate('/login');
    },
  });

  // Mutation para esqueci senha
  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: () => {
      // Pode mostrar uma mensagem de sucesso
      console.log('E-mail de redefinição enviado');
    },
  });

  // Mutation para redefinir senha
  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authService.resetPassword(token, password),
    onSuccess: () => {
      // Pode mostrar uma mensagem de sucesso
      console.log('Senha redefinida com sucesso');
    },
  });

  // Mutation para atualizar perfil
  const updateProfileMutation = useMutation({
    mutationFn: (userData: Partial<User>) => authService.updateProfile(userData),
    onSuccess: (updatedUser) => {
      // Atualiza o cache com os dados atualizados
      queryClient.setQueryData(queryKeys.auth.user, updatedUser);
    },
  });

  // Mutation para alterar senha
  const changePasswordMutation = useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      authService.changePassword(currentPassword, newPassword),
  });

  // Função para fazer login
  const signIn = useCallback(
    (credentials: LoginFormData) => {
      return loginMutation.mutateAsync(credentials);
    },
    [loginMutation]
  );

  // Função para fazer registro
  const signUp = useCallback(
    (companyData: CompanyRegistrationFormData) => {
      return registerMutation.mutateAsync(companyData);
    },
    [registerMutation]
  );

  // Função para fazer logout
  const signOut = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  // Função para solicitar redefinição de senha
  const forgotPassword = useCallback(
    (email: string) => {
      return forgotPasswordMutation.mutateAsync(email);
    },
    [forgotPasswordMutation]
  );

  // Função para redefinir senha
  const resetPassword = useCallback(
    (token: string, password: string) => {
      return resetPasswordMutation.mutateAsync({ token, password });
    },
    [resetPasswordMutation]
  );

  // Função para atualizar perfil
  const updateProfile = useCallback(
    (userData: Partial<User>) => {
      return updateProfileMutation.mutateAsync(userData);
    },
    [updateProfileMutation]
  );

  // Função para alterar senha
  const changePassword = useCallback(
    (currentPassword: string, newPassword: string) => {
      return changePasswordMutation.mutateAsync({ currentPassword, newPassword });
    },
    [changePasswordMutation]
  );

  // Verifica se o usuário está autenticado
  const isAuthenticated = useCallback(() => {
    return authService.isAuthenticated();
  }, []);

  return {
    // Dados do usuário
    user,
    isUserLoading,
    userError,
    
    // Estado de autenticação
    isAuthenticated: isAuthenticated(),
    
    // Funções de autenticação
    signIn,
    signUp,
    signOut,
    forgotPassword,
    resetPassword,
    updateProfile,
    changePassword,
    
    // Estados de loading
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    isForgotPasswordLoading: forgotPasswordMutation.isPending,
    isResetPasswordLoading: resetPasswordMutation.isPending,
    isUpdateProfileLoading: updateProfileMutation.isPending,
    isChangePasswordLoading: changePasswordMutation.isPending,
    
    // Erros
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,
    forgotPasswordError: forgotPasswordMutation.error,
    resetPasswordError: resetPasswordMutation.error,
    updateProfileError: updateProfileMutation.error,
    changePasswordError: changePasswordMutation.error,
  };
};
