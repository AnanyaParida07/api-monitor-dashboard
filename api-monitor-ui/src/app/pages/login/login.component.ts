import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';

loginError = '';

login() {
  this.loginError = '';
  this.authService.login({
    username: this.username,
    password: this.password
  }).subscribe({
    next: (response) => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/']);
    },
    error: () => {
      this.loginError = 'Invalid username or password.';
    }
  });
}
}
