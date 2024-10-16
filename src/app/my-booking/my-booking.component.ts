import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ProgramTourService } from '../Service/program-tour.service';
import { AuthService } from '../Service/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {
  username: string | null = null;
  Cus_ID: number | undefined;
  books: any[] = [];
  selectedbook: any
  isModalOpen: boolean = false;
  participants: any[] = [];
  TotalPrice: number | undefined;
  constructor(private authService: AuthService, private tourService: ProgramTourService, private http: HttpClient) { }

  ngOnInit(): void {
    // ดึง username 
    this.username = this.authService.getUsername();

    if (this.username) {
      // ดึงCus_ID
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
                this.books = bookings;
                this.participants = participants;
                this.books.forEach((book) => {
                  book.Participants = this.participants.filter(
                    (p) => p.Booking_ID === book.Booking_ID
                  );

                });
              },
              (error) => {
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

  openModal(booked: any): void {
    console.log('hello กด ยกเลิก')
    this.selectedbook = { ...booked }
    this.TotalPrice = this.selectedbook.TotalPrice
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  confirmCancel() {
    // เรียกapi 2 ตัว ยกเลบิก กับ  get totalpride status
    console.log('confirmCancel')

    if (this.selectedbook) {
      const BookingData = {
        Booking_ID: this.selectedbook.Booking_ID,
        username: this.username
      }
      console.log('hello bookingdata', BookingData, BookingData.Booking_ID)
      this.tourService.bookcanceling(BookingData).subscribe(
        (response: any) => {
          if (response.Status == 'pending') {
            if (this.TotalPrice) {
              let refund: number = 0;
              refund = this.TotalPrice - response.TotalPrice;
              Swal.fire('ยกเลิกสำเร็จ', `คืนเงิน${refund}บาท`, 'success');
              this.isModalOpen = false;
              this.ngOnInit();
            }

          } else if (response.Status === 'paid') {
            if (this.TotalPrice) {
             
              if (response.TotalPrice > 0) {
               let fee:number =0
               fee = response.TotalPrice
                Swal.fire('เนื่องจากทันยังไม่ได้ชำระเงิน', `ท่านต้องชำระค่าทำเนียมการจอง${fee}บาท`, 'success');
                Swal.fire('ยกเลิกสำเร็จ', `ชำระเงิน${fee}บาท`, 'success');
                this.isModalOpen = false;
                this.ngOnInit();
              }
              Swal.fire('ยกเลิกสำเร็จ', `ชำระเงิน${response.TotalPrice}บาท`, 'success');

            }

          }

        },
        (error) => {
          console.error('error response', error)
          Swal.fire('ยกเลิกไม่สำเร็จ', '', 'error');
        }
      )
    }
  }

  deniedCancel() {
    this.isModalOpen = false;
  }
  x() {
    this.isModalOpen = false;
  }
}
