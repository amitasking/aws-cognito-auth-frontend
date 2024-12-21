import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { fetchAuthSession } from 'aws-amplify/auth';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);

  try {
    // Fetch the current session
    const session = await fetchSession();
    const { accessToken, idToken } = session?.tokens ?? {};

    if (accessToken && idToken) {
      // Allow access if tokens exist
      console.log('Token:', accessToken);
      return true;
    } else {
      // Redirect to login if tokens are missing
      router.navigate(['/login']);
      return false;
    }
  } catch (error) {
    console.error('Error fetching session:', error);
    // Redirect to login in case of an error
    router.navigate(['/login']);
    return false;
  }
};

// Function to fetch the current session
async function fetchSession(): Promise<any> {
  try {
    // Use Amplify's `fetchAuthSession` function to get the session
    const session = await fetchAuthSession();
    const { accessToken, idToken } = session.tokens ?? {};
    return { tokens: { accessToken, idToken } }; // Return the tokens
  } catch (err) {
    console.error('Error fetching session:', err);
    return null; // Return null if an error occurs
  }
}
