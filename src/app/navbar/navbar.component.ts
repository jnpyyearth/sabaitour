import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  title = 'sabaitour';
  isLoggedIn: boolean = false;
  showModal = false;
  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  constructor(private authService: AuthService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
  
  // เข้าถึง loggedIn โดยใช้ ['loggedIn']
  if (navigation?.extras?.state?.['loggedIn']) {
    this.isLoggedIn = true; // ตั้งค่าสถานะการล็อกอินเป็น true
  }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  logout() {
    this.authService.logout(); // เรียกใช้ฟังก์ชัน Logout
    this.isLoggedIn = false;
    this.router.navigate(['/']); // กลับไปหน้า Home
  }

  ChangeinfoForm!: FormGroup;


  Changeinfo(){

  }



}
