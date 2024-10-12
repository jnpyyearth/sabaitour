import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrl: './add-tour.component.css'
})
export class AddTourComponent implements OnInit {
  programTourForm!: FormGroup;
  searchFormGroup!: FormGroup;
  


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    
    // Initialize the form group and set validators
    this.programTourForm = this.fb.group({
      Tour_ID: ['', Validators.required],
      Hotel_ID: ['', Validators.required],
      Guide_ID: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Price_per_day: ['', [Validators.required, Validators.min(0)]],
      Price_per_person: ['', [Validators.required, Validators.min(0)]],
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.programTourForm.valid) {
      // Form is valid, handle the form data
      console.log('Form Submitted:', this.programTourForm.value);
      
      // Reset form after submission
      this.programTourForm.reset();
    } else {
      // If form is invalid, display error messages
      console.log('Form is invalid');
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
