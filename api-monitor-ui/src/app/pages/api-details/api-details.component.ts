import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiMonitorService } from '../../services/api-monitor.service';
import { HistoryResponse } from '../../models/history-response ';
import { MatCardModule } from '@angular/material/card';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, NgApexchartsModule } from 'ng-apexcharts';
import { UptimeResponse } from '../../models/uptime-response';

@Component({
  selector: 'app-api-details',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, MatCardModule],
  templateUrl: './api-details.component.html',
  styleUrls: ['./api-details.component.scss']
})

export class ApiDetailsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private apiService = inject(ApiMonitorService);
  apiId!: number;
  uptime?: UptimeResponse;
  history: HistoryResponse[] = [];

  public chartSeries: ApexAxisChartSeries = [
    {
      name: 'Response Time',
      data: []
    }
  ];

  public chartDetails: ApexChart = {
    type: 'line',
    height: 350
  };

  public chartXAxis: ApexXAxis = {
    categories: []
  };

  public chartTitle: ApexTitleSubtitle = {
    text: 'Response Time Trend'
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || isNaN(Number(id))) {
      return;
    }
    this.apiId = Number(id);
    this.loadHistory();
    this.apiService
      .getUptime(this.apiId)
      .subscribe(response => {
        this.uptime = response;
      });
  }

  loadHistory(): void {

    // this.apiService
    //   .getHistory(this.apiId)
    //   .subscribe(data => {

    //     this.history = data;

    //   });
    this.apiService
      .getHistory(this.apiId)
      .subscribe(data => {
        this.history = data;
        const responseTimes =
          data.map(item => item.responseTime).reverse();
        const timestamps =
          data.map(item =>
            new Date(item.checkedAt)
              .toLocaleTimeString()
          ).reverse();
        this.chartSeries = [
          {
            name: 'Response Time (ms)',
            data: responseTimes
          }
        ];
        this.chartXAxis = {
          categories: timestamps
        };

      });
  }
}