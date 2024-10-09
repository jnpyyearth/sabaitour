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
  
  // Mock Data for Dropdowns
  tours = [
    { Tour_ID: 1, Tour_Name: 'City Tour' },
    { Tour_ID: 2, Tour_Name: 'Mountain Hike' },
    { Tour_ID: 3, Tour_Name: 'Beach Visit' }
  ];

  hotels = [
    { Hotel_ID: 1, Hotel_Name: 'Seaside Hotel' },
    { Hotel_ID: 2, Hotel_Name: 'Mountain Lodge' },
    { Hotel_ID: 3, Hotel_Name: 'City Inn' }
  ];

  guides = [
    { Guide_ID: 1, Guide_Name: 'John Doe' },
    { Guide_ID: 2, Guide_Name: 'Jane Smith' },
    { Guide_ID: 3, Guide_Name: 'Alex Johnson' }
  ];

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
