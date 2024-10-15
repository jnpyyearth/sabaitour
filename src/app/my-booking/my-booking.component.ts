import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ProgramTourService } from '../Service/program-tour.service';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css'
})
export class MyBookingComponent implements OnInit {
  constructor(private authService:AuthService,private tourService: ProgramTourService, private http: HttpClient){}
  username: string |null =null;
  Cus_ID:number | undefined;
  ngOnInit(): void {
    this.username = this.authService.getUsername();
   
    if (this.username) {
      this.tourService.getCustomerInfo(this.username).subscribe({
        next: (response) => {
          const { User_ID, Cus_ID } = response;
          console.log(`User_ID: ${User_ID}, Cus_ID: ${Cus_ID}`);
          this.Cus_ID =Cus_ID;
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
   
  
  openModal(){

  }

  closeModal(){
    
  }

}
