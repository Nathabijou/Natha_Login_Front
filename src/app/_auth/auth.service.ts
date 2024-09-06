import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; // Importez Router
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private PATH_OF_API = 'http://localhost:8080/authenticate'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient, private router: Router) {} // Injectez Router ici
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.PATH_OF_API, { userName: username, userPassword: password })
      .pipe(
        map(response => {
          if (response && response.jwtToken) {
            localStorage.setItem('token', response.jwtToken);
            localStorage.setItem('roles', JSON.stringify(response.roles));
            this.router.navigate(['/home']);
          }
          return response;
        }),
       
      );
  }
  

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.router.navigate(['/login']); // Redirection vers la page de login après déconnexion
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRoles(): string[] {
    return JSON.parse(localStorage.getItem('roles') || '[]');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getProtectedData(url: string): Observable<any> {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<any>(url, { headers });
  }
  
}
