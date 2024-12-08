import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoContribuyenteService } from '../tipo-contribuyente.service';
import { TipoContribuyente } from '../../../shared/models/tipo-contribuyente.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerComponent } from '../../../shared/components/error-handler/error-handler.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tipo-contribuyente-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    RouterLink,
  ],
  templateUrl: './tipo-contribuyente-form.component.html',
  styleUrl: './tipo-contribuyente-form.component.css',
})
export class TipoContribuyenteFormComponent implements OnInit {
  tipoContribuyente: TipoContribuyente = {
    idTipoContribuyente: 0,
    nombre: '',
    estado: true,
  };
  isEditing: boolean = false;

  constructor(
    private tipoContribuyenteService: TipoContribuyenteService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditing = true;
        this.loadTipoContribuyente(params['id']);
      }
    });
  }

  loadTipoContribuyente(id: number): void {
    this.tipoContribuyenteService.getTipoContribuyenteById(id).subscribe({
      next: (tipo) => {
        if (tipo) {
          this.tipoContribuyente = tipo;
        } else {
          this.snackBar.openFromComponent(ErrorHandlerComponent, {
            data: {
              message: `Tipo de contribuyente con id ${id} no encontrado`,
            },
            duration: 5000,
          });
        }
      },
      error: (error) => {
        console.error('Error cargando Tipo de Contribuyente:', error);
        let errorMessage = 'Error cargando Tipo de Contribuyente.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.status == 404) {
          errorMessage = `Tipo de contribuyente con id ${id} no encontrado.`;
        }
        this.snackBar.openFromComponent(ErrorHandlerComponent, {
          data: { message: errorMessage },
          duration: 5000,
        });
      },
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.tipoContribuyenteService
        .updateTipoContribuyente(
          this.tipoContribuyente.idTipoContribuyente,
          this.tipoContribuyente
        )
        .subscribe({
          next: () => {
            this.snackBar.open(
              'Tipo de Contribuyente actualizado correctamente',
              'Cerrar',
              { duration: 3000 }
            );
            this.router.navigate(['/tipos-contribuyente']);
          },
          error: (error) => {
            console.error('Error actualizando el tipo de contribuyente', error);
            let errorMessage =
              'Ocurrió un error al actualizar el tipo de contribuyente.';
            if (error.status === 400) {
              errorMessage = error.error.message;
            } else if (error.error && error.error.message) {
              errorMessage = error.error.message;
            } else if (error.status === 404) {
              errorMessage = `Tipo de contribuyente con id ${this.tipoContribuyente.idTipoContribuyente} no encontrado`;
            }
            this.snackBar.openFromComponent(ErrorHandlerComponent, {
              data: { message: errorMessage },
              duration: 5000,
            });
          },
        });
    } else {
      this.tipoContribuyenteService
        .createTipoContribuyente(this.tipoContribuyente)
        .subscribe({
          next: () => {
            this.snackBar.open(
              'Tipo de Contribuyente creado correctamente',
              'Cerrar',
              { duration: 3000 }
            );
            this.router.navigate(['/tipos-contribuyente']);
          },
          error: (error) => {
            console.error('Error creando el tipo de contribuyente', error);
            let errorMessage =
              'Ocurrió un error al crear el tipo de contribuyente.';
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            } else if (error.status == 400) {
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
}
