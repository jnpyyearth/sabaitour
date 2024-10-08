import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProgramTourForCard } from '../../interfaces/tour';
import { HttpClient } from '@angular/common/http';
import { ProgramTourService } from '../../Service/program-tour.service';

@Component({
  selector: 'app-home-tour-card',
  templateUrl: './home-tour-card.component.html',
  styleUrl: './home-tour-card.component.css'
})
export class HomeTourCardComponent implements OnInit {
 homeTourCard :Observable<ProgramTourForCard[]>|undefined
 selectedPT:ProgramTourForCard | null =null;
 constructor(private tourService: ProgramTourService, private http: HttpClient) { }
 ngOnInit(): void {
     this.homeTourCard =this.tourService.getProgramTourCard().pipe(map(ProgramTours=>ProgramTours.filter(ProgramTour=>ProgramTour.cancelled===0)))
 }

}
