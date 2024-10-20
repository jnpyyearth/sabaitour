import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../Service/auth.service'; // Import the AuthService
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  
   constructor(private http: HttpClient, private router: Router, private authService: AuthService, private fb: FormBuilder) {}

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  

  loginForm!: FormGroup;
  signUpForm!: FormGroup;


  // username: string = '';
  // password: string = '';
  
  errorMessage: string = '';
  userRole: string | null = null;

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "bi bi-eye-slash-fill";

  

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
    //Validate Form
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      firstname: ['', [Validators.required, Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
    },{ validator: this.passwordMatchValidator });

  }

  // Function to handle login
  onLogin(): void {
    console.log("hello login")
    if (this.loginForm.invalid) {
      console.log('form is in valid. ')
      return;
    }

    // create body for backend
    const loginData = this.loginForm.value;
    //ยิ่ง api
    this.http.post<{ token: string }>('http://localhost:3000/login', loginData)
      .subscribe({
        next: (response) => {
          // check have res?
          console.log("hello response")
          //have token?
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
      console.log('Error occurred:', error);  // เพิ่มพิมพ์รายละเอียดทั้งหมด
      console.log('Error status:', error.status); // ตรวจสอบสถานะข้อผิดพลาด
      if (error.status === 401) {
        console.log('hello invalid in frontend');
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
      this.router.navigate(['/add-tour']).then(() => {
        console.log('Navigated to home-manager');
      });
    } else if (this.userRole === 'customer') {
      
      this.router.navigate(['/home'], { state: { loggedIn: true } }).then(() => {
        
        // ซน
        this.authService.setLoggedIn(true);
        console.log('Navigated to home');
      });
    } else if (this.userRole === 'guide') {
      this.router.navigate(['/my-information']).then(() => {
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

  onSignUp() {
    console.log('signUp clicked')
    if (this.signUpForm.invalid) {
      console.log('invlide singUp Form')
      return;
    }

    const signUpData = this.signUpForm.value


    this.http.post('http://localhost:3000/signUp',signUpData)
    .subscribe({
      next:(response)=>{
        Swal.fire({
          title: "สมัคร สำเร็จ!",
          text: "sign up successful",
          icon: "success"
        });
        console.log('Sign up successful.',response);
        this.signUpForm.reset();
      },
      error:(error)=>{
        Swal.fire({
          title: "สมัคร ไม่สำเร็จ",
          text: "sign up failed",
          icon: "error"
        });
        console.error('Sign upfailed',error);
        console.log(signUpData)
      }
    })
  }

}