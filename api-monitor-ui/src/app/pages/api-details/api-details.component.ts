import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiMonitorService } from '../../services/api-monitor.service';
import { HistoryResponse } from '../../models/history-response ';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule,
  ApexStroke,
  ApexYAxis,
  ApexTooltip,
  ApexDataLabels,
  ApexGrid,
  ApexMarkers,
  ApexFill,
} from 'ng-apexcharts';
import { UptimeResponse } from '../../models/uptime-response';

@Component({
  selector: 'app-api-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgApexchartsModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: './api-details.component.html',
  styleUrls: ['./api-details.component.scss'],
})
export class ApiDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiMonitorService);
  apiId!: number;
  uptime?: UptimeResponse;
  history: HistoryResponse[] = [];
  displayedColumns = ['status', 'response', 'checkedAt'];
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  paginatedHistory: HistoryResponse[] = [];

  public chartSeries: ApexAxisChartSeries = [
    {
      name: 'Response Time',
      data: [],
    },
  ];

  public chartDetails: ApexChart = {
    type: 'area',
    height: 380,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    animations: {
      enabled: true,
      speed: 800,
    },
  };

  public chartStroke: ApexStroke = {
    curve: 'smooth',
    width: 4,
  };

  public chartFill: ApexFill = {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [0, 100],
    },
  };

  public chartMarkers: ApexMarkers = {
    size: 5,
    strokeWidth: 2,
    hover: {
      size: 8,
    },
  };

  public chartGrid: ApexGrid = {
    borderColor: '#E5E7EB',
    strokeDashArray: 5,
  };

  public chartDataLabels: ApexDataLabels = {
    enabled: false,
  };

  public chartTooltip: ApexTooltip = {
    x: {
      format: 'dd MMM yyyy HH:mm:ss',
    },
    y: {
      formatter: (value) => `${value} ms`,
    },
  };

  public chartYAxis: ApexYAxis = {
    title: {
      text: 'Response Time (ms)',
    },
  };

  public chartXAxis: ApexXAxis = {
    categories: [],
    labels: {
      rotate: -45,
    },
  };

  public chartColors = ['#2563EB'];

  public chartTitle: ApexTitleSubtitle = {
    text: 'Response Time Trend',
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || isNaN(Number(id))) {
      return;
    }
    this.apiId = Number(id);
    this.loadHistory();
    this.apiService.getUptime(this.apiId).subscribe((response) => {
      this.uptime = response;
    });
  }

  loadHistory(): void {
    this.apiService.getHistory(this.apiId).subscribe((data) => {
      this.history = data;
      this.currentPage = 1;
      this.updatePagination();
      const latestData = data.slice(0, 20).reverse();

      this.chartSeries = [
        {
          name: 'Response Time (ms)',
          data: latestData.map((item) => item.responseTime),
        },
      ];

      this.chartXAxis = {
        categories: latestData.map((item) =>
          new Date(item.checkedAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        ),

        labels: {
          rotate: 0,
          hideOverlappingLabels: true,
          style: {
            fontSize: '12px',
          },
        },
      };
    });
  }

  updatePagination() {
    this.totalPages = Math.max(
      1,
      Math.ceil(this.history.length / this.pageSize),
    );

    const start = (this.currentPage - 1) * this.pageSize;

    const end = start + this.pageSize;

    this.paginatedHistory = this.history.slice(start, end);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;

      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;

      this.updatePagination();
    }
  }
}
