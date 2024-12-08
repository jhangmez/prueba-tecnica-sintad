import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // URL del backend
  private tokenKey = 'authToken'; // TOKEN del backend

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response && response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return (
      typeof window !== 'undefined' && !!localStorage.getItem(this.tokenKey)
    );
  }

  getToken(): string | null {
    return typeof window !== 'undefined'
      ? localStorage.getItem(this.tokenKey)
      : null;
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
}
