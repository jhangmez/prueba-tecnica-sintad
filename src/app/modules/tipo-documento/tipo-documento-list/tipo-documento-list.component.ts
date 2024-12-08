import { Component, OnInit } from '@angular/core';
import { TipoDocumentoService } from '../tipo-documento.service';
import { TipoDocumento } from '../../../shared/models/tipo-documento.model';
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
  selector: 'app-tipo-documento-list',
  standalone: true,
  templateUrl: './tipo-documento-list.component.html',
  styleUrl: './tipo-documento-list.component.css',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    RouterLink,
  ],
})
export class TipoDocumentoListComponent implements OnInit {
  displayedColumns: string[] = [
    'idTipoDocumento',
    'codigo',
    'descripcion',
    'abreviatura',
    'estado',
    'acciones',
  ];
  dataSource = new MatTableDataSource<TipoDocumento>();

  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTiposDocumento();
  }

  loadTiposDocumento(): void {
    this.tipoDocumentoService.getAllTiposDocumento().subscribe({
      next: (tipos) => (this.dataSource.data = tipos),
      error: (error) => {
        console.error('Error loading tipos de documento', error);
        let errorMessage = 'Ocurrió un error al cargar los tipos de documento.';
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

  deleteTipoDocumento(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: '¿Está seguro de que desea eliminar este tipo de documento?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tipoDocumentoService.deleteTipoDocumento(id).subscribe({
          next: () => {
            this.loadTiposDocumento();
            this.snackBar.open(
              'Tipo de documento eliminado correctamente',
              'Cerrar',
              { duration: 3000 }
            );
          },
          error: (error) => {
            console.error('Error deleting tipo de documento', error);
            let errorMessage =
              'Ocurrió un error al eliminar el tipo de documento.';
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            } else if (error.status === 404) {
              errorMessage = `Tipo de documento con id ${id} no encontrado`;
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
