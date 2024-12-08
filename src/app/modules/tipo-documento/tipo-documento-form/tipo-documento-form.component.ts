import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoDocumentoService } from '../tipo-documento.service';
import { TipoDocumento } from '../../../shared/models/tipo-documento.model';
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
  selector: 'app-tipo-documento-form',
  standalone: true,
  templateUrl: './tipo-documento-form.component.html',
  styleUrl: './tipo-documento-form.component.css',
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
})
export class TipoDocumentoFormComponent implements OnInit {
  tipoDocumento: TipoDocumento = {
    idTipoDocumento: 0 || null,
    codigo: '',
    descripcion: '',
    nombre: '',
    estado: true,
  };
  isEditing: boolean = false;

  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditing = true;
        this.loadTipoDocumento(params['id']);
      }
    });
  }

  loadTipoDocumento(id: number) {
    this.tipoDocumentoService.getTipoDocumentoById(id).subscribe({
      next: (tipo) => {
        if (tipo) {
          this.tipoDocumento = tipo;
        } else {
          this.snackBar.openFromComponent(ErrorHandlerComponent, {
            data: { message: `Tipo de Documento con id ${id} no encontrado` },
            duration: 5000,
          });
        }
      },
      error: (error) => {
        console.error('Error cargando Tipo de Documento:', error);
        let errorMessage = 'Error cargando Tipo de Documento.';

        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.status == 404) {
          errorMessage = `Tipo de Documento con id ${id} no encontrado.`;
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
      if (this.tipoDocumento.idTipoDocumento !== null) {
        this.tipoDocumentoService
          .updateTipoDocumento(
            this.tipoDocumento.idTipoDocumento,
            this.tipoDocumento
          )
          .subscribe({
            next: () => {
              this.snackBar.open(
                'Tipo de documento actualizado correctamente',
                'Cerrar',
                { duration: 3000 }
              );
              this.router.navigate(['/tipos-documento']);
            },
            error: (error) => {
              console.error('Error actualizando el tipo de documento', error);
              let errorMessage =
                'Ocurrió un error al actualizar el tipo de documento.';
              if (error.error && error.error.message) {
                errorMessage = error.error.message;
              } else if (error.status == 400) {
                errorMessage = error.error.message;
              } else if (error.status === 404) {
                errorMessage = `Tipo de documento con id ${this.tipoDocumento.idTipoDocumento} no encontrado`;
              }
              this.snackBar.openFromComponent(ErrorHandlerComponent, {
                data: { message: errorMessage },
                duration: 5000,
              });
            },
          });
      }
    } else {
      this.tipoDocumentoService
        .createTipoDocumento(this.tipoDocumento)
        .subscribe({
          next: () => {
            this.snackBar.open(
              'Tipo de documento creado correctamente',
              'Cerrar',
              {
                duration: 3000,
              }
            );
            this.router.navigate(['/tipos-documento']);
          },
          error: (error) => {
            console.error('Error creando el tipo de documento', error);
            let errorMessage =
              'Ocurrió un error al crear el tipo de documento.';
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            } else if (error.status === 400) {
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
