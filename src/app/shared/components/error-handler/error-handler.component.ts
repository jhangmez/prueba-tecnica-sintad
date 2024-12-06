import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-error-handler',
  template: `
    <span style="color: red;">{{ data.message }}</span>
    <button mat-button color="warn" (click)="snackBarRef.dismiss()">
      Cerrar
    </button>
  `,
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule],
})
export class ErrorHandlerComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<ErrorHandlerComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string }
  ) {}
}
