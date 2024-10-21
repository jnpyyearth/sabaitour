import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GuideInOutbound, ProgramTour, ProgramTourForCard } from '../../interfaces/tour';
import { ProgramTourService } from '../../Service/program-tour.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guide-info-card',
  templateUrl: './guide-info-card.component.html',
  styleUrl: './guide-info-card.component.css'
})
export class GuideInfoCardComponent {
  isModalOpen: boolean = false;
  GuideOutbound: Observable<any[]> | undefined;
  GuideInbound: Observable<any[]> | undefined;
  selectedGuide: any = {};
  Guides: Observable<any[]> | null = null;
  constructor(private tourService: ProgramTourService, private http: HttpClient)  {}

  ngOnInit(): void {
    this.GuideOutbound = this.tourService.getOutboundGuides();
    this.GuideInbound =this.tourService.getInboundGuides();
    
  }


  openEditModal(Guidecard: any): void {

    this.selectedGuide = { ...Guidecard };
    console.log("hello card clicked")
    this.isModalOpen = true;
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
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.tourService.cancelledProgramTour(pt).subscribe(
          (response) => {
            console.log('Tour cancelled:', response);

            Swal.fire('Deleted!', 'Your tour has been cancelled.', 'success');
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
          title: "Cancelled",
          text: "Your imaginary file is safe 🙂",
          icon: "error"
        });
      }
    });
    console.log("cancel card clicked")
  }
  closeModal(): void {
    this.isModalOpen = false;

  }
    updateprofile():void{
      if(this.selectedGuide){
        // make payload
        const updateGuideProfile ={
          Guide_ID:this.selectedGuide.Guide_ID,
          firstname:this.selectedGuide.firstname,
          lastname:this.selectedGuide.lastname,
          phone:this.selectedGuide.phone,
          email:this.selectedGuide.email,
          Type_Name:this.selectedGuide.Type_Name,
          User_ID:this.selectedGuide.User_ID
        };
        console.log(' this is update guide:',updateGuideProfile)
        this.tourService.updateGuideProfile(updateGuideProfile).subscribe(
          (response)=>{
            console.log("update guide profile successfully",response)
            Swal.fire('Success', 'Program Tour updated successfully!', 'success');
            this.isModalOpen = false; // ปิด modal หลังจากอัปเดตเสร็จ
        this.ngOnInit();
          },(error)=>{
            console.error('Error response:', error);
    
            Swal.fire('ไม่สามารถแก้ไขได้', 'guide คนนี้ถูกมอบหมายทัวร์ในเวลานี้แล้ว', 'error');
      
          }
        )
      }
    }
}


    



