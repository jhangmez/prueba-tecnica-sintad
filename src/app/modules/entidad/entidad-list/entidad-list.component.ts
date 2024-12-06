import { Component, OnInit } from '@angular/core';
import { EntidadService } from '../entidad.service';
import { Entidad } from '../../../shared/models/entidad.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerComponent } from '../../../shared/components/error-handler/error-handler.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-entidad-list',
  templateUrl: './entidad-list.component.html',
  styleUrl: './entidad-list.component.css',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
  ],
})
export class EntidadListComponent implements OnInit {
  displayedColumns: string[] = [
    'idEntidad',
    'nroDocumento',
    'razonSocial',
    'nombreComercial',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Entidad>();

  constructor(
    private entidadService: EntidadService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEntidades();
  }

  loadEntidades() {
    this.entidadService.getAllEntidades().subscribe({
      next: (entidades) => {
        this.dataSource.data = entidades;
      },
      error: (error) => {
        console.error('Error loading entities', error);
        let errorMessage = 'Ocurrió un error al cargar las entidades.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.snackBar.openFromComponent(ErrorHandlerComponent, {
          data: { message: errorMessage },
          duration: 5000,
        });
      },
    });
  }

  deleteEntidad(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: '¿Está seguro de que desea eliminar esta entidad?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.entidadService.deleteEntidad(id).subscribe({
          next: () => {
            this.loadEntidades();
            this.snackBar.open('Entidad eliminada correctamente', 'Cerrar', {
              duration: 3000,
            });
          },
          error: (error) => {
            console.error('Error deleting entity', error);
            let errorMessage = 'Ocurrió un error al eliminar la entidad.';
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            } else if (error.status === 404) {
              errorMessage = `Entidad con id ${id} no encontrada`;
            }
            this.snackBar.openFromComponent(ErrorHandlerComponent, {
              data: { message: errorMessage },
              duration: 5000,
            });
          },
        });
      }
    });
  }
}
