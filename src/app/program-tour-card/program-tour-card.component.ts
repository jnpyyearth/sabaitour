import { Component, OnInit } from '@angular/core';
import { ProgramTourService } from '../Service/program-tour.service'; // Import the service
import { Tour } from '../interfaces/tour'; // Import the interface
import { Observable } from 'rxjs';

@Component({
  selector: 'app-program-tour-card',
  templateUrl: './program-tour-card.component.html',
  styleUrl: './program-tour-card.component.css'
})
export class ProgramTourCardComponent {

  Tours: Observable<Tour[]> | undefined;
  isModalOpen: boolean = false;
  selectedTour: Tour | null = null;
  programTour: any = {};
  constructor(private tourService: ProgramTourService) { }
  ngOnInit(): void {
    this.Tours = this.tourService.getAllTours();
  }
  openModal(tour: Tour): void {
    this.selectedTour = { ...tour }; // Clone ข้อมูลที่ดึงมา
    this.programTour = {}; //ข้อมูลสำหรับกรอก
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedTour = null;
    this.programTour = null; // ล้างข้อมูล
  }
  saveProgramTour(): void {
    if (this.selectedTour && this.programTour) {
      const newProgramTour = {
        Tour_ID: this.selectedTour.Tour_ID, // ใช้ Tour_ID จากข้อมูลที่เลือก
        StartDate: this.programTour.StartDate,
        EndDate: this.programTour.EndDate,
        Price_per_day: this.programTour.Price_per_day,
        Price_per_person: this.programTour.Price_per_person, // คำนวณแล้ว
        total_seats: this.programTour.total_seats,
        status: this.programTour.status,
        Guide_ID: 1 // สามารถกำหนด Guide_ID ตามที่ต้องการ (หากต้องการให้เลือก)
      };
    }
  }
}
