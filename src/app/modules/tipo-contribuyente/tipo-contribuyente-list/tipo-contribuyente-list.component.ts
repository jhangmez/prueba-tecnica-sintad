import { Component, OnInit } from '@angular/core';
import { TipoContribuyenteService } from '../tipo-contribuyente.service';
import { TipoContribuyente } from '../../../shared/models/tipo-contribuyente.model';
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
  selector: 'app-tipo-contribuyente-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    RouterLink,
  ],
  templateUrl: './tipo-contribuyente-list.component.html',
  styleUrl: './tipo-contribuyente-list.component.css',
})
export class TipoContribuyenteListComponent implements OnInit {
  displayedColumns: string[] = [
    'idTipoContribuyente',
    'descripcion',
    'estado',
    'acciones',
  ];
  dataSource = new MatTableDataSource<TipoContribuyente>();

  constructor(
    private tipoContribuyenteService: TipoContribuyenteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTiposContribuyente();
  }

  loadTiposContribuyente(): void {
    this.tipoContribuyenteService.getAllTiposContribuyente().subscribe({
      next: (tipos) => (this.dataSource.data = tipos),
      error: (error) => {
        console.error('Error loading tipos de contribuyente', error);
        let errorMessage =
          'Ocurrió un error al cargar los tipos de contribuyente.';
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

  deleteTipoContribuyente(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message:
          '¿Está seguro de que desea eliminar este tipo de contribuyente?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tipoContribuyenteService.deleteTipoContribuyente(id).subscribe({
          next: () => {
            this.loadTiposContribuyente();
            this.snackBar.open(
              'Tipo de contribuyente eliminado correctamente',
              'Cerrar',
              { duration: 3000 }
            );
          },
          error: (error) => {
            console.error('Error deleting tipo de contribuyente', error);
            let errorMessage =
              'Ocurrió un error al eliminar el tipo de contribuyente.';
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            } else if (error.status === 404) {
              errorMessage = `Tipo de contribuyente con id ${id} no encontrado`;
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
