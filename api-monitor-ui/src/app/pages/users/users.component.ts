import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { UserService } from '../../services/user.service';
import { UserResponse } from '../../models/user-response';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  protected authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private notification = inject(NotificationService);
  users: UserResponse[] = [];

  filteredUsers: UserResponse[] = [];
  paginatedUsers: UserResponse[] = [];
  searchText = '';
  displayedColumns = ['avatar', 'username', 'role', 'actions'];
  pageSize = 5;
  currentPage = 1;
  totalPages = 1;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = users;
      this.updatePagination();
    });
  }

  searchUsers() {
    const value = this.searchText.toLowerCase();

    this.filteredUsers = this.users.filter((user) =>
      user.username.toLowerCase().includes(value),
    );

    this.currentPage = 1;

    this.updatePagination();
  }

  deleteUser(user: UserResponse) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '420px',
      data: {
        title: 'Delete User',
        message: `Are you sure you want to delete "${user.username}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.loadUsers();
          this.notification.success('User deleted successfully');
        },

        error: (err) => {
          this.notification.error(err.error);
        },
      });
    });
  }

  updatePagination() {
    this.totalPages = Math.max(
      1,
      Math.ceil(this.filteredUsers.length / this.pageSize),
    );
    const start = (this.currentPage - 1) * this.pageSize;

    const end = start + this.pageSize;

    this.paginatedUsers = this.filteredUsers.slice(start, end);
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
