import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ProgramTourService } from '../Service/program-tour.service';
import { AuthService } from '../Service/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css'] // ควรเป็น styleUrls
})
export class MyBookingComponent implements OnInit {
  username: string | null = null;
  Cus_ID: number | undefined;
  books: any[] = []; // เปลี่ยนจาก Observable<any[]> เป็น any[] เพื่อเก็บข้อมูลจริง
  participants: any[] = [];

  constructor(
    private authService: AuthService,
    private tourService: ProgramTourService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // ดึง username ของผู้ใช้
    this.username = this.authService.getUsername();

    if (this.username) {
      // ดึงข้อมูลลูกค้าโดยใช้ username
      this.tourService.getCustomerInfo(this.username).subscribe({
        next: (response) => {
          const { User_ID, Cus_ID } = response;
          console.log(`User_ID: ${User_ID}, Cus_ID: ${Cus_ID}`);
          this.Cus_ID = Cus_ID;

          if (this.Cus_ID) {
            // ใช้ forkJoin เพื่อดึงข้อมูลการจองและข้อมูลผู้เข้าร่วมพร้อมกัน
            forkJoin([
              this.tourService.getmybooked(this.Cus_ID),
              this.tourService.getParticipants()
            ]).subscribe(
              ([bookings, participants]) => {
                console.log('Bookings:', bookings);
                console.log('Participants:', participants);
                this.books = bookings;
                this.participants = participants;
                console.log('Loaded bookings:', this.books);
                console.log('Loaded participants:', this.participants);

                this.books.forEach((book) => {
                  book.Participants = this.participants.filter(
                    (p) => p.Booking_ID === book.Booking_ID
                  );
                  console.log(`Participants for Booking ID ${book.Booking_ID}:`, book.Participants);
                });
                console.log('Updated books with participants:', this.books);
              },
              (error) => {
                console.error('Error fetching booking or participants:', error);
                Swal.fire('Error', 'ไม่สามารถดึงข้อมูลการจองหรือผู้เข้าร่วมได้', 'error');
              }
            );
            
          }
        },
        error: (error) => {
          console.error('Error fetching customer info:', error);
          Swal.fire('Error', 'ไม่สามารถดึงข้อมูลลูกค้าได้', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Username ไม่ถูกต้อง', 'error');
    }
  }

  openModal() {
    // เปิด modal
  }

  closeModal() {
    // ปิด modal
  }
}
