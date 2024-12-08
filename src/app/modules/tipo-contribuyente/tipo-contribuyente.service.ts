import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoContribuyente } from '../../shared/models/tipo-contribuyente.model';
@Injectable({
  providedIn: 'root',
})
export class TipoContribuyenteService {
  private apiUrl = 'http://localhost:8080/tipos-contribuyente'; // URL del backend

  constructor(private http: HttpClient) {}

  getAllTiposContribuyente(): Observable<TipoContribuyente[]> {
    return this.http.get<TipoContribuyente[]>(this.apiUrl);
  }

  getTipoContribuyenteById(id: number): Observable<TipoContribuyente> {
    return this.http.get<TipoContribuyente>(`${this.apiUrl}/${id}`);
  }

  createTipoContribuyente(
    tipoContribuyente: TipoContribuyente
  ): Observable<TipoContribuyente> {
    return this.http.post<TipoContribuyente>(this.apiUrl, tipoContribuyente);
  }

  updateTipoContribuyente(
    id: number,
    tipoContribuyente: TipoContribuyente
  ): Observable<TipoContribuyente> {
    return this.http.put<TipoContribuyente>(
      `${this.apiUrl}/${id}`,
      tipoContribuyente
    );
  }

  deleteTipoContribuyente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
