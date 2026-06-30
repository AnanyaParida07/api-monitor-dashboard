import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiMonitorService } from '../../services/api-monitor.service';


@Component({
  selector: 'app-api-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './api-form.component.html',
  styleUrls: ['./api-form.component.scss']
})
export class ApiFormComponent {
  private route =
    inject(ActivatedRoute);

  private fb = inject(FormBuilder);

  private apiService =
    inject(ApiMonitorService);

  private router =
    inject(Router);

  isEditMode = false;
  apiId!: number;

  form = this.fb.group({
    name: ['', Validators.required],
    url: ['', Validators.required],
    method: ['GET', Validators.required],
    expectedStatus: [200, Validators.required]
  });

  ngOnInit(): void {
    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.apiId = Number(id);
      this.apiService
        .getApiById(this.apiId)
        .subscribe(api => {
          this.form.patchValue({
            name: api.name,
            url: api.url,
            method: api.method,
            expectedStatus:
              api.expectedStatus
          });
        });
    }
  }

  // submit(): void {

  //   if (this.form.invalid) {
  //     return;
  //   }

  //   this.apiService
  //     .createApi(this.form.value as any)
  //     .subscribe(() => {

  //       this.router.navigate(['/apis']);

  //     });

  // }

  submit(): void {

    if (this.form.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.apiService
        .updateApi(
          this.apiId,
          this.form.value as any
        )
        .subscribe(() => {
          this.router.navigate(
            ['/apis']
          );
        });

    } else {
      this.apiService
        .createApi(
          this.form.value as any
        )
        .subscribe(() => {
          this.router.navigate(
            ['/apis']
          );
        });
    }
  }

}