import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-sidebar-guide',
  templateUrl: './sidebar-guide.component.html',
  styleUrl: './sidebar-guide.component.css'
})
export class SidebarGuideComponent {

  constructor(private authService: AuthService, private router: Router){}

  logout() {
    this.authService.logout(); // เรียกใช้ฟังก์ชัน Logout
    this.router.navigate(['/']); // กลับไปหน้า Home
  }
}
