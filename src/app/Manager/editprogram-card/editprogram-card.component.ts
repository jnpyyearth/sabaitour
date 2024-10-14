import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GuideInOutbound, ProgramTour, ProgramTourForCard } from '../../interfaces/tour';
import { ProgramTourService } from '../../Service/program-tour.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editprogram-card',
  templateUrl: './editprogram-card.component.html',
  styleUrl: './editprogram-card.component.css'
})
export class EditprogramCardComponent implements OnInit {
  isModalOpen: boolean = false;
  ProgramTour: Observable<ProgramTourForCard[]> | undefined;
  selectedProgramTour: ProgramTourForCard | null = null;
  Guides: Observable<GuideInOutbound[]> | null = null;
  ShowAllGuide:any
  guideUnavailable:boolean =false;
  constructor(private tourService: ProgramTourService, private http: HttpClient) { }
  ngOnInit(): void {
    this.ProgramTour = this.tourService.getProgramTourCard().pipe(
      map(ProgramTours=>ProgramTours.filter(ProgramTour=>ProgramTour.cancelled===0))
    )
     // ดึงข้อมูลไกด์ทั้งหมด
  this.tourService.getAllGuides().subscribe(guides => {
    this.ShowAllGuide= guides; // เก็บข้อมูลไกด์ทั้งหมดในตัวแปร Guides
  });

  }
  openEditModal(pt: ProgramTourForCard): void {

    this.selectedProgramTour = { ...pt }
    console.log("hello card clicked")
    this.isModalOpen = true;
    //กรอง guide ที่ประเภทตรงกับ ประเถททัวร์
    this.Guides = this.tourService.getAllGuides().pipe(
      map(guides => guides.filter(guide => guide.Type_Name === this.selectedProgramTour?.Type_Status))
    );
    this.selectedProgramTour.Guide_ID = this.selectedProgramTour.Guide_ID;
  }
  openCancelModal(pt: ProgramTourForCard): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "จะยกเลิกทัวร์หรือไม่?",
      text: "ทัวร์นี้สามารถกู้คืนได้ภายหลัง!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ดำเนินการต่อ ",
      cancelButtonText: "ไม่ดำเนินการต่อ",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.tourService.cancelledProgramTour(pt).subscribe(
          (response) => {
            console.log('Tour cancelled:', response);

            Swal.fire('ยกเลืกทัวร์สำเร็จ!', '', 'success');
            this.ngOnInit(); // Refresh the data
          },
          (error) => {
            console.log('id',)
            console.error('Error cancelling program tour:', error);
            Swal.fire('Error', 'There was an error cancelling the Program Tour.', 'error');
          }
        );
      
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "ยกเลิกทัวร์ไม่สำเร็จ",
          text: "",
          icon: "error"
        });
      }
    });
    console.log("cancel card clicked")
  }
  closeModal(): void {
    this.isModalOpen = false;

  }


  saveProgramTour(): void {

    
    if(this.selectedProgramTour){
      const updatedProgramTour = {
        ProgramTour_ID:this.selectedProgramTour.ProgramTour_ID,
        StartDate: this.selectedProgramTour.StartDate,
        EndDate: this.selectedProgramTour.EndDate,
        Price_per_day: this.selectedProgramTour.Price_per_day,
        Guide_ID: this.selectedProgramTour.Guide_ID,
        total_seats: this.selectedProgramTour.total_seats,
        available_seats: this.selectedProgramTour.total_seats // หรือค่าอื่นที่คุณต้องการคำนวณใหม่
      };
  
      console.log('Sending data to API:', this.selectedProgramTour); 
      console.log('Price_per_day:', this.selectedProgramTour.Price_per_day);
      this.tourService.updateProgramTour( updatedProgramTour).subscribe(

      (response)=>{
        console.log("update succesful",response)
        Swal.fire('Success', 'Program Tour updated successfully!', 'success');
        this.isModalOpen = false; // ปิด modal หลังจากอัปเดตเสร็จ
        this.ngOnInit();
      },
      (error) => {
        console.error('Error response:', error);
    
            Swal.fire('ไม่สามารถแก้ไขได้', 'guide คนนี้ถูกมอบหมายทัวร์ในเวลานี้แล้ว', 'error');
      
    }
      )
    }
  }

}