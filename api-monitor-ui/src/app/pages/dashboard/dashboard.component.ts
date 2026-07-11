import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardResponse } from '../../models/dashboard-response';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { interval } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
  NgApexchartsModule,
  ApexXAxis,
  ApexAxisChartSeries,
  ApexStroke,
  ApexDataLabels,
  ApexGrid,
  ApexTooltip,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    NgApexchartsModule,
    MatIconModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private destroyRef = inject(DestroyRef);
  public pieSeries: ApexNonAxisChartSeries = [];
  public pieChart: ApexChart = {
    type: 'donut',
    height: 330,
    toolbar: {
      show: false,
    },
  };

  public pieColors = ['#10B981', '#EF4444'];

  public pieLabels: string[] = ['Healthy', 'Failed'];

  public pieLegend: ApexLegend = {
    position: 'bottom',
    fontSize: '14px',
    fontWeight: 600,
  };

  public pieResponsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
      },
    },
  ];

  public responseSeries: ApexAxisChartSeries = [];

  public responseChart: ApexChart = {
    type: 'line',
    height: 350,
    foreColor: '#64748B',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    animations: {
      enabled: true,
      // easing: 'easeinout',
      speed: 800,
    },
  };

  public responseStroke: ApexStroke = {
    curve: 'smooth',
    width: 5,
  };

  public responseDataLabels: ApexDataLabels = {
    enabled: false,
  };

  public responseGrid: ApexGrid = {
    borderColor: '#E5E7EB',
    strokeDashArray: 4,
    padding: {
      left: 12,
      right: 12,
    },
  };

  public responseTooltip: ApexTooltip = {
    theme: 'light',

    marker: {
      show: true,
    },
    y: {
      formatter: (value) => `${value} ms`,
    },
  };

  public responseFill: ApexFill = {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [0, 100],
    },
  };

  public responseMarkers: ApexMarkers = {
    size: 4,
    strokeWidth: 2,
    hover: {
      size: 8,
    },
  };

  public responseYAxis: ApexYAxis = {
    title: {
      text: 'Response Time (ms)',
    },
  };

  public responseXAxis: ApexXAxis = {
    categories: [],
    labels: {
      rotate: -35,
    },
  };

  dashboard: DashboardResponse = {
    totalApis: 0,
    healthyApis: 0,
    failedApis: 0,
    averageResponseTime: 0,
  };

  loading = false;
  lastRefresh = new Date();

  ngOnInit(): void {
    this.loadDashboard();
    interval(30000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadDashboard();
      });
  }

  loadDashboard(): void {
    this.loading = true;
    this.dashboardService.getDashboard().subscribe({
      next: (response) => {
        this.dashboard = response;
        this.pieSeries = [response.healthyApis, response.failedApis];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });

    this.dashboardService.getResponseTrend().subscribe((data) => {
      this.responseSeries = [
        {
          name: 'Response Time',
          data: data.map((x) => x.responseTime).reverse(),
        },
      ];
      this.responseXAxis = {
        categories: data.map((x) => x.timestamp).reverse(),
      };
    });
  }
}
