import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiMonitorService } from '../../services/api-monitor.service';
import { MonitoredApi } from '../../models/monitored-api';
import { HistoryResponse } from '../../models/history-response ';
import { RouterLink } from '@angular/router';
import { interval } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-api-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.scss']
})
export class ApiListComponent implements OnInit {

  history: HistoryResponse[] = [];
  private apiService = inject(ApiMonitorService);
  private destroyRef = inject(DestroyRef);


  apis: MonitoredApi[] = [];
  displayedColumns: string[] = [
    'name',
    'status',
    'responseTime',
    'actions'
  ];
  loading = false;

  ngOnInit(): void {
    this.loadApis();

    interval(30000)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {

        this.loadApis();

      });
  }

  deleteApi(id: number): void {
    if (!confirm('Delete this API?')) {
      return;
    }
    this.apiService
      .deleteApi(id)
      .subscribe(() => {
        this.loadApis();
      });
  }


  loadApis() {
    this.loading = true;
    this.apiService.getApis()
      .subscribe(data => {

        this.apis = data;
        this.apis.forEach(api => {

          this.apiService
            .getLatestStatus(api.id)
            .subscribe({
              next: (status) => {

                api.latestStatus = status;
                this.loading = false;

              },
              error: () => {

                api.latestStatus = {
                  status: 'UNKNOWN',
                  statusCode: 0,
                  responseTime: 0,
                  checkedAt: ''
                };
                this.loading = false;

              }
            });
        });
      });
  }
}