import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardResponse } from '../../models/dashboard-response';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { interval } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
  NgApexchartsModule,
  ApexXAxis,
  ApexAxisChartSeries
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private dashboardService =
    inject(DashboardService);
  private destroyRef = inject(DestroyRef);


  // dashboard?: DashboardResponse;
  public pieSeries: ApexNonAxisChartSeries = [];

  public pieChart: ApexChart = {
    type: 'pie',
    height: 350
  };

  public pieLabels: string[] = [
    'Healthy',
    'Failed'
  ];

  public pieLegend: ApexLegend = {
    position: 'bottom'
  };

  public pieResponsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        }
      }
    }
  ];

  public responseSeries:
    ApexAxisChartSeries = [];

  public responseChart:
    ApexChart = {

      type: 'line',

      height: 350

    };

  public responseXAxis:
    ApexXAxis = {

      categories: []

    };

  dashboard: DashboardResponse = {
    totalApis: 0,
    healthyApis: 0,
    failedApis: 0,
    averageResponseTime: 0
  };
  loading = false;

  lastRefresh = new Date();



  ngOnInit(): void {

    this.loadDashboard();

    interval(30000)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {

        this.loadDashboard();

      });
  }


  loadDashboard(): void {

    this.loading = true;

    this.dashboardService
      .getDashboard()
      .subscribe({
        next: response => {

          this.dashboard = response;

          this.pieSeries = [
            response.healthyApis,
            response.failedApis
          ];

          this.loading = false;
        },
        error: err => {

          console.error(err);

          this.loading = false;
        }
      });

      this.dashboardService
    .getResponseTrend()
    .subscribe(data => {

      this.responseSeries = [
        {
          name: 'Response Time',

          data: data
            .map(x => x.responseTime)
            .reverse()
        }
      ];

      this.responseXAxis = {

        categories: data
          .map(x => x.timestamp)
          .reverse()

      };

    });

  }
}