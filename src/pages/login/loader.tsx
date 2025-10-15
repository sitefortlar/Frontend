import { authService } from '@/services/auth';

export const loginLoader = async () => {
  const token = authService.getToken();
  
  // If token exists and is valid, redirect to catalog
  if (token && authService.isTokenValid(token)) {
    const user = authService.getCurrentUserFromStorage();
    
    if (user) {
      throw new Response(null, {
        status: 302,
        headers: {
          Location: '/catalog',
        },
      });
    }
  }

  // If no valid token, continue to login page
  return null;
};
