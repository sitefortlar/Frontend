import { authService } from '@/services/auth';

export const loginLoader = async () => {
  const token = authService.getToken();
  
  // If token exists and is valid, redirect to welcome
  if (token && authService.isTokenValid(token)) {
    throw new Response(null, {
      status: 302,
      headers: {
        Location: '/welcome',
      },
    });
  }

  // If no valid token, continue to login page
  return null;
};
