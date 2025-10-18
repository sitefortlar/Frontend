import { authService } from '@/services/auth';

export const loginLoader = async () => {
  const token = authService.getToken();
  
  
    const user = authService.getCurrentUserFromStorage();
    
    if (user && token) {
      throw new Response(null, {
        status: 302,
        headers: {
          Location: '/catalog',
        },
      });
    }
  
  return null;
};
