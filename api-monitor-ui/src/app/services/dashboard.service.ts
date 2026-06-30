import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardResponse } from '../models/dashboard-response';
import { ResponseTimePoint } from '../models/response-time-point';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:7070/api/dashboard';

  getDashboard(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(this.apiUrl);
  }

  getResponseTrend() {

  return this.http.get<ResponseTimePoint[]>(
    'http://localhost:7070/api/dashboard/response-trend'
  );
}
}