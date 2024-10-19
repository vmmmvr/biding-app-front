// hooks/useAuth.js
import { useEffect } from 'react';

const useAuth = () => {
  useEffect(() => {
    // Ensure the hook runs only on the client side
    if (typeof window !== 'undefined') {
      // Check if the user is stored in localStorage
      const user = localStorage.getItem('user');

      if (!user) {
        // Redirect to /auth if no user is found
        window.location.replace('/auth');
      }
    }
  }, []);
};

export default useAuth;
