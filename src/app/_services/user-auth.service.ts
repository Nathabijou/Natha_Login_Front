import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private tokenKey = 'jwtToken';
  private rolesKey = 'roles';

  constructor() {}

  public setRoles(roles: any[]) {
    localStorage.setItem(this.rolesKey, JSON.stringify(roles));
  }

  public getRoles(): any[] {
    const roles = localStorage.getItem(this.rolesKey);
    return roles ? JSON.parse(roles) : [];
  }

  public setToken(jwtToken: string) {
    localStorage.setItem(this.tokenKey, jwtToken);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
