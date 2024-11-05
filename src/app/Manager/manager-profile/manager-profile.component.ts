import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ProgramTourService } from '../../Service/program-tour.service';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrl: './manager-profile.component.css'
})
export class ManagerProfileComponent implements OnInit{
  username: string | null = null;
  constructor(private authService: AuthService, private tourService: ProgramTourService, private http: HttpClient) { }
  Manager: any
  ngOnInit(): void {
    this.username = this.authService.getUsername();
    if (this.username) {
      this.tourService.Manager(this.username).subscribe(
        (response) => {
          this.Manager = response
          console.log('i got profile')
        }, (error) => {
          console.error('error ')
        }
      )
    }

  }
}
