import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  goBack(): void {
    window.history.back(); // ฟังก์ชันนี้จะพาผู้ใช้กลับไปหน้าก่อนหน้านี้
  }
  
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    console.log("hello")
    // ตรวจสอบ username และ password ที่นี่
    this.authService.login(); // เรียกใช้ฟังก์ชัน Login
    this.router.navigate(['/']); // กลับไปหน้า Home
  }

  


  
}
