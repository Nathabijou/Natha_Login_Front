import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private PATH_OF_API = 'http://localhost:8080/authenticate';

  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  // Méthode pour la connexion des utilisateurs
  public login(loginData: any): Observable<any> {
    return this.httpclient.post<any>(this.PATH_OF_API, loginData).pipe(
      tap(response => {
        if (response && response.jwtToken) {
          this.userAuthService.setToken(response.jwtToken); // Stocke le token JWT
          this.userAuthService.setRoles(response.roles); // Stocke les rôles de l'utilisateur
        } else {
          console.warn('No JWT Token received');
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  // Méthode pour obtenir les en-têtes avec JWT
  private getHeaders(): HttpHeaders {
    const token = this.userAuthService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Méthodes pour accéder aux différentes ressources
  public forAdmin(): Observable<any> {
    const headers = this.getHeaders();
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', { headers: headers, responseType: 'text' }).pipe(
      catchError(error => {
        console.error('Error fetching admin resource:', error);
        return throwError(() => new Error('Failed to fetch admin resource'));
      })
    );
  }

  public forManager(): Observable<any> {
    const headers = this.getHeaders();
    return this.httpclient.get(this.PATH_OF_API + '/forManager', { headers: headers, responseType: 'text' }).pipe(
      catchError(error => {
        console.error('Error fetching manager resource:', error);
        return throwError(() => new Error('Failed to fetch manager resource'));
      })
    );
  }

  public forUser(): Observable<any> {
    const headers = this.getHeaders();
    return this.httpclient.get(this.PATH_OF_API + '/forUser', { headers: headers, responseType: 'text' }).pipe(
      catchError(error => {
        console.error('Error fetching user resource:', error);
        return throwError(() => new Error('Failed to fetch user resource'));
      })
    );
  }

  public forModerant(): Observable<any> {
    const headers = this.getHeaders();
    return this.httpclient.get(this.PATH_OF_API + '/forModerant', { headers: headers, responseType: 'text' }).pipe(
      catchError(error => {
        console.error('Error fetching moderant resource:', error);
        return throwError(() => new Error('Failed to fetch moderant resource'));
      })
    );
  }

  // Méthode pour vérifier si les rôles de l'utilisateur correspondent aux rôles autorisés
  public roleMatch(allowedRoles: string[]): boolean {
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles) {
      return userRoles.some((role: any) => allowedRoles.includes(role.roleName));
    }
    return false;
  }
}
