import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { ProgramTourService } from '../../Service/program-tour.service';

@Component({
  selector: 'app-tourist-details',
  templateUrl: './tourist-details.component.html',
  styleUrl: './tourist-details.component.css'
})
export class TouristDetailsComponent implements OnInit{
  programtourId: number | undefined
  tourist:any[] =[];

  constructor(private route: ActivatedRoute, private tourService: ProgramTourService, private authService: AuthService,private fb: FormBuilder) { }
  ngOnInit(): void {
      this.route.paramMap.subscribe(params=>{
        this.programtourId = Number(params.get('id'));
        if(this.programtourId){
          console.log('this is programtour id ',this.programtourId)
          this.tourService.getTouristById(this.programtourId).subscribe(
            (response:any)=>{
              if (response.participantsresult) {
                this.tourist = response.participantsresult; 
              } else {
                console.error('No participants result found');
              }
            }, (error) => {
              console.error('error');
            }
          )
        }
      })
  }
}
