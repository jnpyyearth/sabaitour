import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  title = 'sabaitour';
  isLoggedIn: boolean = false;
  showModal = false;
  
  // ngOnInit(): void {
  //   this.isLoggedIn = this.authService.isLoggedIn();
  // }

  constructor(private authService: AuthService, private router: Router,private fb: FormBuilder) {
    const navigation = this.router.getCurrentNavigation();
  
  // เข้าถึง loggedIn โดยใช้ ['loggedIn']
  if (navigation?.extras?.state?.['loggedIn']) {
    this.isLoggedIn = true; // ตั้งค่าสถานะการล็อกอินเป็น true
  }
  }

  

  ngOnInit(): void {
    this.ChangeinfoForm = this.fb.group({
      newusername: ['', Validators.required],
      newfirstname: ['', Validators.required],
      newlastname: ['', Validators.required],
      newphone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],  // ตัวอย่างตรวจสอบเบอร์โทร
      newemail: ['', [Validators.required, Validators.email]],
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
      newconfirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.isLoggedIn = this.authService.isLoggedIn();
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