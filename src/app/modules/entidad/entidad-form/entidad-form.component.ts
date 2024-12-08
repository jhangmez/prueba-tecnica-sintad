import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadService } from '../entidad.service';
import { Entidad } from '../../../shared/models/entidad.model';
import { TipoDocumento } from '../../../shared/models/tipo-documento.model';
import { TipoContribuyente } from '../../../shared/models/tipo-contribuyente.model';
import { TipoDocumentoService } from '../../tipo-documento/tipo-documento.service';
import { TipoContribuyenteService } from '../../tipo-contribuyente/tipo-contribuyente.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerComponent } from '../../../shared/components/error-handler/error-handler.component';
import { RouterLink } from '@angular/router';
import { EntidadCrear } from '../../../shared/models/entidad.create.model';

@Component({
  selector: 'app-entidad-form',
  templateUrl: './entidad-form.component.html',
  styleUrl: './entidad-form.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
  ],
})
export class EntidadFormComponent implements OnInit {
  entidad: Entidad = {
    idTipoDocumento: 0,
    nroDocumento: '',
    razonSocial: '',
  };
  tiposDocumento: TipoDocumento[] = [];
  tiposContribuyente: TipoContribuyente[] = [];
  isEditing: boolean = false;
  selectedTipoDocumento: number | null = null;
  selectedTipoContribuyente: number | null = null;

  constructor(
    private entidadService: EntidadService,
    private tipoDocumentoService: TipoDocumentoService,
    private tipoContribuyenteService: TipoContribuyenteService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTiposDocumento();
    this.loadTiposContribuyente();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditing = true;
        this.loadEntidad(params['id']);
      }
    });
  }

  loadEntidad(id: number): void {
    this.entidadService.getEntidadById(id).subscribe(
      (entidad) => {
        if (entidad) {
          this.entidad = entidad;
          this.selectedTipoDocumento = entidad.idTipoDocumento ?? null;
          this.selectedTipoContribuyente = entidad.idTipoContribuyente ?? null;
        } else {
          this.snackBar.openFromComponent(ErrorHandlerComponent, {
            data: { message: `Entidad con id ${id} no encontrada` },
            duration: 5000,
          });
        }
      },
      (error) => {
        console.error('Error loading entity', error);
        let errorMessage = 'Ocurrió un error al cargar la entidad.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.status === 404) {
          errorMessage = `Entidad con id ${id} no encontrada.`;
        }
        this.snackBar.openFromComponent(ErrorHandlerComponent, {
          data: { message: errorMessage },
          duration: 5000,
        });
      }
    );
  }

  loadTiposDocumento(): void {
    this.tipoDocumentoService
      .getAllTiposDocumento()
      .subscribe((tipos) => (this.tiposDocumento = tipos));
  }

  loadTiposContribuyente(): void {
    this.tipoContribuyenteService
      .getAllTiposContribuyente()
      .subscribe((tipos) => (this.tiposContribuyente = tipos));
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.entidadService
        .updateEntidad(this.entidad.idEntidad!, this.entidad)
        .subscribe({
          next: () => {
            this.snackBar.open('Entidad actualizada correctamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/entidades']);
          },
          error: (error) => {
            console.error('Error updating entity', error);
            let errorMessage = 'Ocurrió un error al actualizar la entidad.';
            if (error.status === 400) {
              errorMessage = error.error.message;
            } else if (error.error && error.error.message) {
              errorMessage = error.error.message;
            } else if (error.status === 404) {
              errorMessage = `Entidad con id ${this.entidad.idEntidad} no encontrada`;
            }
            this.snackBar.openFromComponent(ErrorHandlerComponent, {
              data: { message: errorMessage },
              duration: 5000,
            });
          },
        });
    } else {
      const entidadACrear: EntidadCrear = {
        tipoDocumento: { idTipoDocumento: this.entidad.idTipoDocumento },
        nroDocumento: this.entidad.nroDocumento,
        razonSocial: this.entidad.razonSocial,
        nombreComercial: this.entidad.nombreComercial,
        tipoContribuyente: this.entidad.idTipoContribuyente
          ? { idTipoContribuyente: this.entidad.idTipoContribuyente }
          : null,
        direccion: this.entidad.direccion,
        telefono: this.entidad.telefono,
      };
      this.entidadService.createEntidad(entidadACrear).subscribe({
        next: () => {
          this.snackBar.open('Entidad creada correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/entidades']);
        },
        error: (error) => {
          console.error('Error creating entity', error);
          let errorMessage = 'Ocurrió un error al crear la entidad.';
          if (error.status === 400) {
            errorMessage = error.error.message;
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
}
