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
  constructor(private tourService: ProgramTourService) { }
  ngOnInit(): void {
    this.Tours = this.tourService.getAllTours();
  }
}
