import { authService } from '@/services/auth/auth';

export const withAuthenticationLoader = async () => {
  const token = authService.getToken();
  
  if (!token) {
    throw new Response(null, {
      status: 302,
      headers: {
        Location: '/login',
      },
    });
  }

  return { token };
};
