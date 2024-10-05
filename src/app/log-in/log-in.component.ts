import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../Service/auth.service'; // Import the AuthService

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  userRole: string | null = null;

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "bi bi-eye-slash-fill";

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    // Check if user is already logged in
    if (token) {
      this.userRole = this.authService.getRole();
      this.navigateBaseOnRole();
    }
    const container = document.getElementById('container') as HTMLElement | null;
    const registerBtn = document.getElementById('register') as HTMLElement | null;
    const loginBtn = document.getElementById('login') as HTMLElement | null;

    // เพิ่มคลาส "active" เมื่อคลิกที่ปุ่ม Sign Up
    if (registerBtn && container) {
      registerBtn.addEventListener('click', () => {
        container?.classList.add("active");
      });
    }

    // ลบคลาส "active" เมื่อคลิกที่ปุ่ม Sign In
    if (loginBtn && container) {
      loginBtn.addEventListener('click', () => {
        container?.classList.remove("active");
      });
    }
  }
  
  // Function to handle login
  onLogin(): void {
    console.log("hello login")
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required';
      return;
    }

    const loginData = { username: this.username, password: this.password };

    this.http.post<{ token: string }>('http://localhost:3000/login', loginData)
      .subscribe({
        next: (response) => {
          console.log("hello response")
          if (response.token) {
            // Save the token to localStorage and decode
            this.authService.login(response.token);
            this.userRole = this.authService.getRole();
            console.log("route")
            // Navigate based on the user role
            this.navigateBaseOnRole();
            console.log("route เเล้ว")
          } else {
            this.errorMessage = 'Login failed. Invalid token.';
          }
        },
        error: (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Invalid username or password';
          } else {
            this.errorMessage = 'Server error';
          }
        }
      });
  }

  // Navigate based on the user role
  private navigateBaseOnRole(): void {
    console.log('Navigating to:', this.userRole);
    if (this.userRole === 'manager') {
      this.router.navigate(['/home-manager']).then(() => {
        console.log('Navigated to home-manager');
      });
    } else if (this.userRole === 'customer') {
      this.router.navigate(['/home']).then(() => {
        console.log('Navigated to home');
      });
    } else if (this.userRole === 'guide') {
      this.router.navigate(['/home-guide']).then(() => {
        console.log('Navigated to home-guide');
      });
    } else {
      this.errorMessage = 'Unknown role. Cannot navigate.';
    }
}

  // Function to toggle password visibility (optional)
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "bi bi-eye-fill" : this.eyeIcon = "bi bi-eye-slash-fill";
    this.isText ? this.type = "text" : this.type = "password";
  }

}
