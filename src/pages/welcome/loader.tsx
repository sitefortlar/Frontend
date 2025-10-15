// import { authService } from '@/services';

// export const welcomeLoader = async () => {
//   const token = authService.getToken();
  
//   // Check if token is valid
//   if (!token || !authService.isTokenValid(token)) {
//     // Just redirect to login without clearing localStorage
//     throw new Response(null, {
//       status: 302,
//       headers: {
//         Location: '/login',
//       },
//     });
//   }

//   // Get user data from localStorage
//   const user = authService.getCurrentUserFromStorage();
  
//   if (!user) {
//     // Just redirect to login without clearing localStorage
//     throw new Response(null, {
//       status: 302,
//       headers: {
//         Location: '/login',
//       },
//     });
//   }

//   // Mock clients for now
//   const clients = [
//     {
//       id: 'client_1',
//       name: 'Empresa ABC Ltda',
//       cnpj: '12.345.678/0001-90',
//       email: 'contato@empresaabc.com',
//       phone: '(11) 99999-9999',
//       isActive: true,
//     }
//   ];

//   // If user has only 1 client, save clientId and redirect to catalog
//   if (clients.length === 1) {
//     localStorage.setItem('selected_client_id', clients[0].id);
//     throw new Response(null, {
//       status: 302,
//       headers: {
//         Location: '/home',
//       },
//     });
//   }

//   // If user has multiple clients, return user data to show client selection
//   return { user, clients };
// };
