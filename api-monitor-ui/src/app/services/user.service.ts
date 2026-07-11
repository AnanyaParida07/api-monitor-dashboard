import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRequest } from '../models/user-request';
import { UserResponse } from '../models/user-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:7070/api/users';

  getUsers() {
    return this.http.get<UserResponse[]>(this.apiUrl);
  }

  getUserById(id: number) {
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`);
  }

  createUser(request: UserRequest) {
    return this.http.post<UserResponse>(this.apiUrl, request);
  }

  updateUser(id: number, request: UserRequest) {
    return this.http.put<UserResponse>(`${this.apiUrl}/${id}`, request);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
