import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  //keep token in localstorage  
  login(token: string): void {
    localStorage.setItem('token', token);
  }
  //remove token
  logout(): void {
    localStorage.removeItem('token');

    this.router.navigate(['/']);
  }
  //check if user authen
  isAuthen(): boolean {
    return !!localStorage.getItem('token');
  }
  //get the username from the token
  getUsername(): string | null {
    const token = localStorage.getItem('token')
    if (token) {
      const payload = this.decodeToken(token);
      return payload?.user?.username || null;
    }
    return null;
  }
  getRole(){
    const token = localStorage.getItem('token')
    if (token) {
      const payload = this.decodeToken(token);
      return payload?.user?.role || null;
    }
    return null;
  }
  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('failed to decode token', error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Return true if there is a token
  }

}
