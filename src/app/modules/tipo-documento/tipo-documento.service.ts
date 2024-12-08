import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../../shared/models/tipo-documento.model';
@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService {
  private apiUrl = 'http://localhost:8080/tipos-documento'; // URL del backend
  constructor(private http: HttpClient) {}
  getAllTiposDocumento(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(this.apiUrl);
  }

  getTipoDocumentoById(id: number): Observable<TipoDocumento> {
    return this.http.get<TipoDocumento>(`${this.apiUrl}/${id}`);
  }

  createTipoDocumento(tipoDocumento: TipoDocumento): Observable<TipoDocumento> {
    return this.http.post<TipoDocumento>(this.apiUrl, tipoDocumento);
  }

  updateTipoDocumento(
    id: number,
    tipoDocumento: TipoDocumento
  ): Observable<TipoDocumento> {
    return this.http.put<TipoDocumento>(`${this.apiUrl}/${id}`, tipoDocumento);
  }

  deleteTipoDocumento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
