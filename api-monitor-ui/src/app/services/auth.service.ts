import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:7070/api/auth';

  login(request: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/login`,
      request
    );
  }

  register(request: LoginRequest) {
    return this.http.post(
      `${this.baseUrl}/register`,
      request
    );
  }

}