import { Component } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-manager',
  templateUrl: './sidebar-manager.component.html',
  styleUrl: './sidebar-manager.component.css'
})
export class SidebarManagerComponent {

  constructor(private authService: AuthService, private router: Router){}

  logout() {
    this.authService.logout(); // เรียกใช้ฟังก์ชัน Logout
    this.router.navigate(['/']); // กลับไปหน้า Home
  }
}
