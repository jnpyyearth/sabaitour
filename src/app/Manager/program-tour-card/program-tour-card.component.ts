import { Component, OnInit } from '@angular/core';
import { ProgramTourService } from '../../Service/program-tour.service'; // Import the service
import { Tour, Guide, GuideInOutbound } from '../../interfaces/tour'; // Import the interface
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-program-tour-card',
  templateUrl: './program-tour-card.component.html',
  styleUrl: './program-tour-card.component.css'
})
export class ProgramTourCardComponent implements OnInit {
  searchFormGroup!: FormGroup;

  Tours: Observable<Tour[]> | undefined;
  Guides: Observable<GuideInOutbound[]> | null = null;
  isModalOpen: boolean = false;
  selectedTour: Tour | null = null;
  programTour: any = {};
  guideId: any;
  guideUnavailable: boolean = false;
  selectedFile: File | null = null; 
  constructor(private tourService: ProgramTourService, private http: HttpClient) { }
  ngOnInit(): void {
    this.Tours = this.tourService.getAllTours();
    this.guideUnavailable= false;

  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      alert('กรุณาเลือกไฟล์ PDF.');
      this.selectedFile = null;
    }
  }


  openModal(tour: Tour): void {
    this.selectedTour = { ...tour }; // Clone ข้อมูลที่ดึงมา
    this.programTour = {}; // ข้อมูลสำหรับกรอก
    this.Guides = null;
    this.isModalOpen = true;

    // กรองไกด์ตาม Type_Status ของทัวร์ (inbound/outbound)
    this.Guides = this.tourService.getAllGuides().pipe(
      map(guides => guides.filter(guide => guide.Type_Name === this.selectedTour?.Type_Status))
    );

    console.log('Guides after fetching:', this.Guides);
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedTour = null;
    this.programTour = null; // ล้างข้อมูล
    this.ngOnInit(); 


  }

  saveProgramTour(): void {

    console.log('Save programtour clicked:');
    if (this.selectedTour && this.programTour && this.selectedFile) {
      Swal.fire({
        title: "เพิ่มโปรเเกรมทัวร์!",
        text: "สำเร็จ!",
        icon: "success"
      });
      // const newProgramTour = {
      //   Tour_ID: this.selectedTour.Tour_ID, // ใช้ Tour_ID จากข้อมูลที่เลือก
      //   StartDate: this.programTour.StartDate,
      //   EndDate: this.programTour.EndDate,
      //   Price_per_day: this.programTour.Price_per_day,
      //   total_seats: this.programTour.total_seats,
      //   Guide_ID: this.programTour.Guide_ID
      // };
      const newProgramTour = new FormData();
      newProgramTour.append('pdf', this.selectedFile, this.selectedFile.name);
      newProgramTour.append('Tour_ID', this.selectedTour.Tour_ID.toString());
      newProgramTour.append('StartDate', this.programTour.StartDate);
      newProgramTour.append('EndDate', this.programTour.EndDate);
      newProgramTour.append('Price_per_day', this.programTour.Price_per_day.toString());
      newProgramTour.append('total_seats', this.programTour.total_seats.toString());
      newProgramTour.append('Guide_ID', this.programTour.Guide_ID.toString());
      console.log('Data programtour:', newProgramTour);
      this.http.post<any>('http://localhost:3000/addProgramTour', newProgramTour)
        .subscribe({
          next: (response) => {
            if (response.available == false) {
              Swal.fire({
                title: "ไม่สำเร็จ!",
                text: "ไกด์คนนี้ถูกจองในช่วงเวลานี้แล้ว",
                icon: "error"
              });
            }
            else {
              // ถ้าไกด์ว่าง, ดำเนินการต่อ
              Swal.fire({
                title: "เพิ่มโปรเเกรมทัวร์!",
                text: "สำเร็จ!",
                icon: "success"
              });
              this.ngOnInit(); // Refresh หน้า
            }
          },
          error: (error) => {
            if (error.status === 400) {
              Swal.fire({
                title: "ไม่สำเร็จ!",
                text: "มีโปรเเกรมทัวร์นี้อยู่เเล้ว!",
                icon: "error"
              });
            }
            console.error('Error:', error);
          }
        })
    }
    this.isModalOpen = false;
  }
 
CheckSameGuide(Guide_ID:number,StartDate:string,EndDate:string){
  if (Guide_ID && StartDate && EndDate) {
    const csguide = {
      Guide_ID: Guide_ID,
      StartDate: StartDate,
      EndDate: EndDate
    };

    this.http.post<any>('http://localhost:3000/checkSameGuide', csguide).subscribe((response) => {
      this.guideUnavailable = true; 
    });
  }else {
    this.guideUnavailable =false;
  }

}
}
