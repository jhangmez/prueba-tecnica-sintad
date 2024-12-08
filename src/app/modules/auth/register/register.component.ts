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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
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
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    email: '',
  };
  hidePassword = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  register() {
    this.authService.register(this.user).subscribe({
      next: () => {
        this.snackBar.open('Registro exitoso', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        let errorMessage = 'Ocurrió un error durante el registro.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (
          error.status === 400 &&
          error.error &&
          Array.isArray(error.error)
        ) {
          errorMessage = error.error
            .map((e: any) => e.defaultMessage)
            .join(', ');
        }
        this.snackBar.openFromComponent(ErrorHandlerComponent, {
          data: { message: errorMessage },
          duration: 5000,
        });
      },
    });
  }
}
