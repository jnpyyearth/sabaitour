import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramTourService } from '../Service/program-tour.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms'; // จำเป็นสำหรับ ngModel
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { partition } from 'rxjs';
import { AuthService } from '../Service/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']  // Fixed: styleUrls instead of styleUrl
})
export class TourDetailComponent implements OnInit {
  tourId: number | undefined;
  tourDetails: any;
  reviews: any[] = [];
  selectedTour: any;
  username: string | null = null;
  isModalOpen = false;
  numberParticipant = 1;
  Participants: {
    firstname: string;
    lastname: string;
    id_card: string;
    DateOfBirth: Date;
    email: string;
    phone: string;
    special_request: string;

  }[] = [];
  reviewForm!: FormGroup;
  showForms = false;
  booking = {};
  constructor(private route: ActivatedRoute, private tourService: ProgramTourService, private authService: AuthService,private fb: FormBuilder) { }


  ngOnInit(): void {
    // Get the tour ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.tourId = Number(params.get('id')); // 'id' should match the parameter name in the route configuration
      
      // Fetch the tour details using the tour ID
      if (this.tourId) {
        this.getTourDetails(this.tourId);
        this.getTourReviews(this.tourId);
        console.log('this is tour id in ngoninit',this.tourId)
      }
    });
    
    this.username = this.authService.getUsername()
    this.reviewForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(4)]]
    });
    
  }

  getTourDetails(id: number) {
    this.tourService.getProgramTourById(id).subscribe(data => {
      console.log('Tour details:', data); // ตรวจสอบข้อมูลที่ถูกส่งกลับ
      this.tourDetails = data[0];
    }, error => {
      console.error('Error fetching tour details:', error); // จับ error ถ้ามี
    });
  }

  getTourReviews(tourId: number) {
    console.log('Fetching reviews for ProgramTour_ID:', tourId);
    this.tourService.getReviewsForTour(tourId).subscribe(data => {
      this.reviews = data; 
      console.log('Hello Reviews:', data);  // เก็บรีวิวในตัวแปร reviews
    }, error => {
      console.error('Error fetching reviews:', error);
    });
  }
  openModal() {

    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  //สร้างformตามจำนวน
  createForm(ProgramTour: any) {
    this.selectedTour = { ...ProgramTour }
    if(this.numberParticipant  > this.selectedTour.available_seats){
      Swal.fire('จองไม่สำเร็จ', 'ขอภัยมีที่ว่างไม่่พอตามที่ท่านจอง', 'error');
    }
    this.Participants = []
    for (let i = 0; i < this.numberParticipant; i++) {
      this.Participants.push({ firstname: '', lastname: '', id_card: '', DateOfBirth: new Date(), email: '', phone: '', special_request: '' });
    }
    
    console.log('hello createform')
    this.showForms = true;
    this.closeModal();
  }

  //ส่งform
  submitForms() {
    console.log("hello")
    if (this.selectedTour && this.Participants) {
      const bookingData = {
        username: this.username,
        ProgramTour_ID: this.selectedTour.ProgramTour_ID,
        price_per_person: this.selectedTour.Price_per_person,
        participants: this.Participants
      };
      console.log('hello submitForms', bookingData)
      this.tourService.addbooking(bookingData).subscribe(
        (response) => {
          console.log("addbooking", response)
          Swal.fire('จองสำเร็จ', 'ส่งข้อมูลการจองสำเร็จ', 'success');
          this.Participants =[];
          this.ngOnInit();
        },
        (error) => {
          console.log("Error add booking  tour:", error);

        }
      )
    }



 
  }
  submitReview() {
    if (this.reviewForm.invalid) {
      Swal.fire('Error', 'Please fill out the form correctly.', 'error');
      return;
    }

    // สร้างข้อมูลสำหรับส่งรีวิวไป backend (เฉพาะ comment)
    const reviewData = {
      comment: this.reviewForm.value.comment,
      username:this.username,
      ProgramTour_ID:this.tourId
    };

    this.tourService.addreview(reviewData).subscribe(
      (response) => {
        Swal.fire('สำเร็จ', 'ความเห็นของคุณถูกส่งเรียบร้อยแล้ว', 'success');
        this.reviewForm.reset();  // เคลียร์ฟอร์มหลังจากส่งเสร็จ
      },
      (error) => {
        Swal.fire('ข้อผิดพลาด', 'ไม่สามารถส่งความเห็นได้', 'error');
        console.error('Error submitting review:', error);
      }
    );
  }

}

