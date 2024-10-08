import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/login-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login successful:', response);
        // เก็บ token ใน localStorage
        localStorage.setItem('token', response.token);
      },
      error => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid username or password';
      }
    );
  }

  ngOnInit(): void {
    const container = document.getElementById('container') as HTMLElement | null;
    const registerBtn = document.getElementById('register') as HTMLElement | null;
    const loginBtn = document.getElementById('login') as HTMLElement | null;

    if (registerBtn && container) {
      registerBtn.addEventListener('click', () => {
        container?.classList.add("active");
      });
    }

    if (loginBtn && container) {
      loginBtn.addEventListener('click', () => {
        container?.classList.remove("active");
      });
    }
  }
}
