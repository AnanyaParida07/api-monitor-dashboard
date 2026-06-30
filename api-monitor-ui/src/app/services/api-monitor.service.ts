import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MonitoredApi } from '../models/monitored-api';
import { LatestStatusResponse } from '../models/latest-status-response';
import { HistoryResponse } from '../models/history-response ';
import { CreateApiRequest } from '../models/create-api-request';
import { UptimeResponse } from '../models/uptime-response';

@Injectable({
  providedIn: 'root'
})
export class ApiMonitorService {

  private http = inject(HttpClient);

  private baseUrl =
    'http://localhost:7070/api/monitor';

  getApis(): Observable<MonitoredApi[]> {

    return this.http.get<MonitoredApi[]>(
      this.baseUrl
    );
  }

  getLatestStatus(apiId: number)
    : Observable<LatestStatusResponse> {

    return this.http.get<LatestStatusResponse>(
      `http://localhost:7070/api/history/${apiId}/latest`
    );
  }

  getHistory(
    apiId: number
  ): Observable<HistoryResponse[]> {

    return this.http.get<HistoryResponse[]>(
      `http://localhost:7070/api/history/${apiId}`
    );
  }

  createApi(request: CreateApiRequest) {

    return this.http.post(
      this.baseUrl,
      request
    );
  }

  deleteApi(id: number) {

    return this.http.delete(
      `${this.baseUrl}/${id}`
    );
  }

  updateApi(
    id: number,
    request: CreateApiRequest
  ) {

    return this.http.put(
      `${this.baseUrl}/${id}`,
      request
    );
  }

  getApiById(id: number) {

    return this.http.get<MonitoredApi>(
      `${this.baseUrl}/${id}`
    );
  }
  
  getUptime(apiId: number) {

    return this.http.get<UptimeResponse>(
      `http://localhost:7070/api/history/${apiId}/uptime`
    );
  }

}