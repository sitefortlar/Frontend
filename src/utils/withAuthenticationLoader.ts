import { authService } from '@/services/auth';

export const withAuthenticationLoader = async () => {
  const token = authService.getToken();
  
  if (!token || !authService.isTokenValid(token)) {
    // Clear invalid token
    await authService.logout();
    throw new Response(null, {
      status: 302,
      headers: {
        Location: '/login',
      },
    });
  }

  return { token };
};
