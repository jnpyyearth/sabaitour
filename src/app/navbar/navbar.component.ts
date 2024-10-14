import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  title = 'sabaitour';

  constructor(private authService: AuthService, private router: Router) {}

  // isLoggedIn(): boolean {
  //   return this.authService.isLoggedIn(); // ตรวจสอบว่าผู้ใช้เข้าสู่ระบบอยู่หรือไม่
  // }

  login() {
    this.router.navigate(['/log-in']); // ไปยังหน้า Login
  }

  logout() {
    this.authService.logout(); // เรียกใช้ฟังก์ชัน Logout
    this.router.navigate(['/']); // กลับไปหน้า Home
  }





}
