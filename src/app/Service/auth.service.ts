import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private loggedIn = false;

  login() {
    this.loggedIn = true; // ตั้งค่าสถานะเป็นล็อกอิน
  }

  logout() {
    this.loggedIn = false; // ตั้งค่าสถานะเป็นออกจากระบบ
  }

  isLoggedIn(): boolean {
    return this.loggedIn; // คืนค่าสถานะล็อกอิน
  }
}
