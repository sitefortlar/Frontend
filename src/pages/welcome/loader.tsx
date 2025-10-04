import { authService, userService } from '@/services';

export const welcomeLoader = async () => {
  const token = authService.getToken();
  
  // Check if token is valid
  if (!token || !authService.isTokenValid(token)) {
    // Clear invalid token and redirect to login
    await authService.logout();
    throw new Response(null, {
      status: 302,
      headers: {
        Location: '/login',
      },
    });
  }

  try {
    // Get user data
    const user = await userService.getCurrentUser();
    const clients = user.clients.filter(client => client.isActive);

    // If user has only 1 client, save clientId and redirect to home
    if (clients.length === 1) {
      localStorage.setItem('selected_client_id', clients[0].id);
      throw new Response(null, {
        status: 302,
        headers: {
          Location: '/home',
        },
      });
    }

    // If user has multiple clients, return user data to show client selection
    return { user, clients };
  } catch (error) {
    // If error getting user data, clear token and redirect to login
    await authService.logout();
    throw new Response(null, {
      status: 302,
      headers: {
        Location: '/login',
      },
    });
  }
};
