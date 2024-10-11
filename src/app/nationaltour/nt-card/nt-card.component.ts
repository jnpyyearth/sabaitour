import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProgramTourForCard } from '../../interfaces/tour';
import { ProgramTourService } from '../../Service/program-tour.service';

@Component({
  selector: 'app-nt-card',
  templateUrl: './nt-card.component.html',
  styleUrl: './nt-card.component.css'
})
export class NtCardComponent   implements OnInit{
  NTCard :Observable<ProgramTourForCard[]>|undefined
  selectedPT:ProgramTourForCard | null =null;
  constructor(private tourService: ProgramTourService, private http: HttpClient) { }
  ngOnInit(): void {
      this.NTCard =this.tourService.getInboundProgramTour().pipe(map(ProgramTours=>ProgramTours.filter(ProgramTour=>ProgramTour.cancelled===0)))
  }
 
}
