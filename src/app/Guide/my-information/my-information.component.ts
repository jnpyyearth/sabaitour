import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ProgramTourService } from '../../Service/program-tour.service';

@Component({
  selector: 'app-my-information',
  templateUrl: './my-information.component.html',
  styleUrl: './my-information.component.css'
})
export class MyInformationComponent implements OnInit {
  username: string | null = null;
  guide: any
  constructor(private authService: AuthService, private tourService: ProgramTourService, private http: HttpClient) { }
  ngOnInit(): void {
    this.username = this.authService.getUsername();
    if (this.username) {
      this.tourService.Guideprofile(this.username).subscribe(
        (response) => {
          this.guide = response
          console.log('i got profile')
        }, (error) => {
          console.error('error ')
        }
      )
    }

  }
}
