import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:7070/api/auth';

  login(request: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, request);
  }

  register(request: LoginRequest) {
    return this.http.post(`${this.baseUrl}/register`, request);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  private getPayload(): any {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    return JSON.parse(atob(token.split('.')[1]));
  }

  getUsername(): string {
    return this.getPayload()?.sub;
  }

  getRole(): string {
    return this.getPayload()?.role;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isUser(): boolean {
    return this.getRole() === 'USER';
  }
}
