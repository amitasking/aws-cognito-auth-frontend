import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { fetchAuthSession } from 'aws-amplify/auth'; // Import your fetchSession function

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Convert the Promise returned by fetchSession to an Observable
    return from(this.fetchSession()).pipe(
      switchMap((session) => {
        const { accessToken } = session?.tokens || {};

        if (accessToken) {
          // If token exists, clone the request and add the Authorization header
          const clonedRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          return next.handle(clonedRequest);
        } else {
          // If no token, pass the original request
          return next.handle(req);
        }
      })
    );
  }

  async fetchSession(): Promise<any> {
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
  
}
