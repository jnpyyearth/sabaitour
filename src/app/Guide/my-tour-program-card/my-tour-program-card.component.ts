import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProgramTourService } from '../../Service/program-tour.service';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-my-tour-program-card',
  templateUrl: './my-tour-program-card.component.html',
  styleUrl: './my-tour-program-card.component.css'
})
export class MyTourProgramCardComponent  implements OnInit{
 myProgramTour:any =[];
 username:string |null = null;
 constructor(private tourService: ProgramTourService, private http: HttpClient,private authService: AuthService) { }
  ngOnInit(): void {
    this.username = this.authService.getUsername()
      
      if (this.username) {
        this.tourService.getMyProgramForGuide(this.username).subscribe(
          (response) => {
            this.myProgramTour = response
            console.log('i got programtour',response,this.username)
          }, (error) => {
            console.error('error ')
          }
        )
      }
    }
}
