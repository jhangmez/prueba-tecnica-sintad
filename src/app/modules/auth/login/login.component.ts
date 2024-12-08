import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerComponent } from '../../../shared/components/error-handler/error-handler.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    RouterLink,
  ],
})
export class LoginComponent {
  credentials = {
    username: '',
    password: '',
  };
  hidePassword = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  login() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/entidades']);
      },
      error: (error) => {
        console.error('Login failed', error);
        let errorMessage = 'Ocurrió un error durante el inicio de sesión.';
        if (error.status === 401) {
          errorMessage = 'Credenciales inválidas.';
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.snackBar.openFromComponent(ErrorHandlerComponent, {
          data: { message: errorMessage },
          duration: 5000,
        });
      },
    });
  }
}
