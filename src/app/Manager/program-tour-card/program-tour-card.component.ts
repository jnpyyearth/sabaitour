import { Component, OnInit } from '@angular/core';
import { ProgramTourService } from '../../Service/program-tour.service'; // Import the service
import { Tour, Guide, GuideInOutbound } from '../../interfaces/tour'; // Import the interface
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-program-tour-card',
  templateUrl: './program-tour-card.component.html',
  styleUrl: './program-tour-card.component.css'
})
export class ProgramTourCardComponent implements OnInit {

  Tours: Observable<Tour[]> | undefined;
  Guides: Observable<GuideInOutbound[]> | null = null;
  isModalOpen: boolean = false;
  selectedTour: Tour | null = null;
  programTour: any = {};
  constructor(private tourService: ProgramTourService, private http: HttpClient) { }
  ngOnInit(): void {
    this.Tours = this.tourService.getAllTours();

  }
  // openModal(tour: Tour): void {
  //   this.selectedTour = { ...tour }; // Clone ข้อมูลที่ดึงมา
  //   this.programTour = {}; //ข้อมูลสำหรับกรอก
  //   this.Guides = null
  //   console.log('Guides reset:', this.Guides);
  //   this.isModalOpen = true;
  //   // กรองไกด์ตาม Type_Status ของทัวร์ (inbound/outbound)
  //   this.Guides = this.tourService.getAllGuides().pipe(
  //     map(guides => guides.filter(guide => guide.Type_Name === this.selectedTour?.Type_Status))
  //   );


  //   console.log('Guides after fetching:', this.Guides);
  // }

  // closeModal(): void {
  //   this.isModalOpen = false;
  //   this.selectedTour = null;
  //   this.programTour = null; // ล้างข้อมูล
  // }


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
  
  
  }
  
  saveProgramTour(): void {

    console.log('Save programtour clicked:');
    if (this.selectedTour && this.programTour) {
      Swal.fire({
        title: "เพิ่มโปรเเกรมทัวร์!",
        text: "สำเร็จ!",
        icon: "success"
      });
      const newProgramTour = {
        Tour_ID: this.selectedTour.Tour_ID, // ใช้ Tour_ID จากข้อมูลที่เลือก
        StartDate: this.programTour.StartDate,
        EndDate: this.programTour.EndDate,
        Price_per_day: this.programTour.Price_per_day,
        total_seats: this.programTour.total_seats,
        Guide_ID: this.programTour.Guide_ID
      };
      console.log('Data programtour:', newProgramTour);
      this.http.post('http://localhost:3000/addProgramTour', newProgramTour)
        .subscribe({
          next: (response) => {
            console.log('this is response', response)
            this.ngOnInit();
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


  }
}
