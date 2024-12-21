import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { fetchAuthSession } from '@aws-amplify/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginStatusChanged = new EventEmitter<void>();

  constructor(private http: HttpClient, private router: Router) {}

  async getSession() {
    try {
      const session: any = await fetchAuthSession();
      console.log('ID Token:', session.tokens.idToken);
      console.log('Access Token:', session.tokens.accessToken);
      return session.tokens.idToken || session.tokens.accessToken;
    } catch (error) {
      console.error('No active session:', error);
      return null;
    }
  }
}
