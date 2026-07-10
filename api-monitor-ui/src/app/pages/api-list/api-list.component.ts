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
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-api-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.scss'],
})
export class ApiListComponent implements OnInit {
  history: HistoryResponse[] = [];
  private apiService = inject(ApiMonitorService);
  private destroyRef = inject(DestroyRef);
  protected auth = inject(AuthService);
  private notification = inject(NotificationService);
  private dialog = inject(MatDialog);

  apis: MonitoredApi[] = [];
  filteredApis: MonitoredApi[] = [];
  dataSource = new MatTableDataSource<MonitoredApi>();
  searchText = '';
  statusFilter = 'ALL';
  pageSize = 5;
  currentPage = 1;
  totalPages = 1;
  displayedColumns: string[] = ['name', 'status', 'responseTime', 'actions'];
  loading = false;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {
    this.loadApis();

    interval(30000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadApis();
      });
  }

  deleteApi(api: MonitoredApi): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '420px',
      data: {
        title: 'Delete API',
        message: `Are you sure you want to delete "${api.name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.apiService.deleteApi(api.id).subscribe({
        next: () => {
          this.loadApis();

          this.notification.success('API deleted successfully');
        },

        error: (err) => {
          this.notification.error(err.error || 'Failed to delete API');
        },
      });
    });
  }

  loadApis() {
    this.loading = true;
    this.apiService.getApis().subscribe((data) => {
      this.apis = data;
      this.filteredApis = [...this.apis];
      this.updatePagination();
      this.apis.forEach((api) => {
        this.apiService.getLatestStatus(api.id).subscribe({
          next: (status) => {
            api.latestStatus = status;
            this.applyFilters();
            this.loading = false;
          },
          error: () => {
            api.latestStatus = {
              status: 'UNKNOWN',
              statusCode: 0,
              responseTime: 0,
              checkedAt: '',
            };
            this.applyFilters();
            this.loading = false;
          },
        });
      });
    });
  }

  applyFilters(): void {
    this.filteredApis = this.apis.filter((api) => {
      const matchesSearch = api.name
        .toLowerCase()
        .includes(this.searchText.toLowerCase());

      const status = api.latestStatus?.status ?? 'UNKNOWN';

      const matchesStatus =
        this.statusFilter === 'ALL' || status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });

    this.currentPage = 1;

    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredApis.length / this.pageSize);

    const start = (this.currentPage - 1) * this.pageSize;

    const page = this.filteredApis.slice(start, start + this.pageSize);

    this.dataSource.data = page;

    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'status':
          return item.latestStatus?.status ?? '';

        case 'responseTime':
          return item.latestStatus?.responseTime ?? 0;

        default:
          return (item as any)[property];
      }
    };
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;

      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;

      this.updatePagination();
    }
  }
}
