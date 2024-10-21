import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-manager-regsitration',
  templateUrl: './manager-regsitration.component.html',
  styleUrl: './manager-regsitration.component.css'
})
export class ManagerRegsitrationComponent  implements OnInit{
  signUpForm!: FormGroup;
  selectedFile: File | null = null; // Variable to store the selected file

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      key: ['', Validators.required] 
    });
  }

  // Function to handle file selection
  onFileSelected(event: any): void {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      this.selectedFile = file;
    }
  }

  // Function to handle form submission
  onSignUp(): void {
    if (this.signUpForm.valid) {
      const formData = new FormData();
      formData.append('username', this.signUpForm.get('username')?.value);
      formData.append('email', this.signUpForm.get('email')?.value);
      formData.append('firstname', this.signUpForm.get('firstname')?.value);
      formData.append('lastname', this.signUpForm.get('lastname')?.value);
      formData.append('phone', this.signUpForm.get('phone')?.value);
      formData.append('password', this.signUpForm.get('password')?.value);
      formData.append('access_key', this.signUpForm.get('key')?.value);
      formData.append('confirmPassword', this.signUpForm.get('confirmPassword')?.value);

      // Append the file if selected
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      // Check if passwords match
      if (this.signUpForm.get('password')?.value !== this.signUpForm.get('confirmPassword')?.value) {
        Swal.fire('Error', 'Passwords do not match!', 'error');
      } else {
        // Send form data to backend
        this.http.post('http://localhost:3000/managerSignUp', formData).subscribe({
          next: (response) => {
            Swal.fire('Success', 'Sign up successful!', 'success');
            this.signUpForm.reset(); // Reset form after submission
            this.selectedFile = null; // Clear file after submission
          },
          error: (error) => {
            if(error.status ===401){
              Swal.fire('สมัครไม่สำเสร็จ', 'ท่านไม่ได้รับอนุญาติให้สมัครผู้จัดการ', 'error');
            }else if(error.status ===400){
              Swal.fire('Error', 'Sign up failed!', 'error');
            console.error('Sign up failed:', error);
            }
            
          }
        });
      }
    } else {
      Swal.fire('Error', 'Please fill out all required fields.', 'error');
    }
  }

}
