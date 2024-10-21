import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
@Component({
  selector: 'app-guide-registration',
  templateUrl: './guide-registration.component.html',
  styleUrl: './guide-registration.component.css'
})
export class GuideRegistrationComponent {
  signUpForm!: FormGroup;
  selectedFile: File | null = null;
  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private fb: FormBuilder){}
  ngOnInit(): void {
    // สร้าง FormGroup และ FormControl สำหรับฟอร์ม
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      guidetype: new FormControl('inbound', Validators.required)  // ตั้งค่า default เป็น 'inbound'
    });
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }


  onSignUp() {
    // ตรวจสอบว่าฟอร์ม valid ก่อนส่งข้อมูล
   
    if (this.signUpForm.valid) {
      // const formData = this.signUpForm.value;
      // console.log(formData);
       const formData = new FormData();
      formData.append('username', this.signUpForm.get('username')?.value);
      formData.append('email', this.signUpForm.get('email')?.value);
      formData.append('firstname', this.signUpForm.get('firstname')?.value);
      formData.append('lastname', this.signUpForm.get('lastname')?.value);
      formData.append('phone', this.signUpForm.get('phone')?.value);
      formData.append('password', this.signUpForm.get('password')?.value);
      formData.append('guidetype', this.signUpForm.get('guidetype')?.value);
      
      formData.append('confirmPassword',this.signUpForm.get('confirmPassword')?.value);
      // ตรวจสอบว่า password กับ confirmPassword ตรงกันหรือไม่
      if(this.selectedFile){
        formData.append('image', this.selectedFile);
      }
      if (this.signUpForm.get('password')?.value !== this.signUpForm.get('confirmPassword')?.value) {
        console.log("Passwords do not match!");
      } else {
        // ส่งข้อมูลไปยัง backend หรือแสดงผลลัพธ์
        console.log("Form submitted successfully:", formData);
      }
     
     
    this.http.post('http://localhost:3000/guideSignUp',formData)
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
        console.log(FormData)
      }
    })
  }else {
      console.log("Please fill out all required fields.");
    }


  }
}