import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProgramTourForCard } from '../../interfaces/tour';
import { ProgramTourService } from '../../Service/program-tour.service';

@Component({
  selector: 'app-inter-tou-card',
  templateUrl: './inter-tou-card.component.html',
  styleUrl: './inter-tou-card.component.css'
})
export class InterTouCardComponent implements OnInit{
  INTCard :Observable<ProgramTourForCard[]>|undefined
  selectedPT:ProgramTourForCard | null =null;
  constructor(private tourService: ProgramTourService, private http: HttpClient) { }
  ngOnInit(): void {
      this.INTCard =this.tourService.getOutboundProgramTour().pipe(map(ProgramTours=>ProgramTours.filter(ProgramTour=>ProgramTour.cancelled===0)))
  }
}
