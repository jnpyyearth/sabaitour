import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProgramTourService } from '../../Service/program-tour.service';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrl: './add-tour.component.css'
})
export class AddTourComponent implements OnInit {
  programTourForm!: FormGroup;
  searchFormGroup!: FormGroup;
  addTourForm!: FormGroup;
  selectedFile: File | null = null;
  isModalOpen:boolean =false;

  constructor(private fb: FormBuilder,private tourService: ProgramTourService) { }

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

    this.addTourForm = this.fb.group({
      Tour_name: ['', Validators.required],
      Tour_Country: ['', Validators.required],
      Hotel: ['', Validators.required],
      Type_Status: ['', Validators.required],
      image: [null, Validators.required]
    });
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.addTourForm.patchValue({ image: file });
      this.addTourForm.get('image')?.updateValueAndValidity();
    }
  }

  onAddTourSubmit(): void {
    console.log("hello เพิ่มทัวร์")
    if (this.addTourForm.invalid || !this.selectedFile) {
      Swal.fire('Error', 'Please fill in all fields and select an image.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('Tour_name', this.addTourForm.get('Tour_name')?.value);
    formData.append('Tour_Country', this.addTourForm.get('Tour_Country')?.value);
    formData.append('Hotel', this.addTourForm.get('Hotel')?.value);
    formData.append('Type_Status', this.addTourForm.get('Type_Status')?.value);
    formData.append('image', this.selectedFile);

    this.tourService.addOriginalTour(formData).subscribe(
      response => {
        Swal.fire('สำเร็จ', 'เพิ่มทัวร์สำเร็จ!', 'success');
        this.addTourForm.reset();
        this.selectedFile = null;
      },
      error => {
        console.error('Error adding tour:', error);
        Swal.fire('ไม่สำเร็จ', 'เพิ่มทัวร์ไม่สำเร็จ', 'error');
      }
    );
  }
  openAddTourModal(){
    this.isModalOpen =true;
  }
  // Handle form submission
  closeAddTourModal(){
    this.isModalOpen=false;
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
