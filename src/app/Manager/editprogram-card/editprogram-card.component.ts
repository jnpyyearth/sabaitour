import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProgramTour, ProgramTourForCard } from '../../interfaces/tour';
import { ProgramTourService } from '../../Service/program-tour.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editprogram-card',
  templateUrl: './editprogram-card.component.html',
  styleUrl: './editprogram-card.component.css'
})
export class EditprogramCardComponent implements OnInit{

  ProgramTour:Observable<ProgramTourForCard[]>|undefined;

  constructor(private tourService: ProgramTourService, private http: HttpClient) { }
   ngOnInit(): void {
       this.ProgramTour =this.tourService.getProgramTourCard();
   }
   openModal(pt:ProgramTourForCard):void{
    console.log("hello card clicked")
   }
}
