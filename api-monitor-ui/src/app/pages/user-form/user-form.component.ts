import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  protected router = inject(Router);
  private route = inject(ActivatedRoute);
  private notification = inject(NotificationService);

  isEditMode = false;
  userId!: number;
  hidePassword = true;

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    role: ['USER', Validators.required],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();
      this.userId = Number(id);
      this.userService.getUserById(this.userId).subscribe((user) => {
        this.form.patchValue({
          username: user.username,
          role: user.role,
        });
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    if (this.isEditMode) {
      this.userService
        .updateUser(this.userId, this.form.value as any)
        .subscribe(() => {
          this.notification.success(
            this.isEditMode
              ? 'User updated successfully'
              : 'User created successfully',
          );
          this.router.navigate(['/users']);
        });
    } else {
      this.userService.createUser(this.form.value as any).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
