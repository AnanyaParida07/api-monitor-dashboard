import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet ,RouterLinkActive} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'api-monitor-ui';
  private router = inject(Router);
  protected authService = inject(AuthService);

  logout() {

    localStorage.removeItem('token');

    this.router.navigate(['/login']);

  }
}
