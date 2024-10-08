import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramTourService } from '../Service/program-tour.service';
@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']  // Fixed: styleUrls instead of styleUrl
})
export class TourDetailComponent implements OnInit{
  tourId: number | undefined;
  tourDetails: any;

  constructor(private route: ActivatedRoute, private tourService: ProgramTourService) {}

  
  ngOnInit(): void {
    // Get the tour ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.tourId = Number(params.get('id')); // 'id' should match the parameter name in the route configuration

      // Fetch the tour details using the tour ID
      if (this.tourId) {
        this.getTourDetails(this.tourId);
      }
    });
  }

  getTourDetails(id: number) {
    this.tourService.getProgramTourById(id).subscribe(data => {
      console.log('Tour details:', data); // ตรวจสอบข้อมูลที่ถูกส่งกลับ
      this.tourDetails = data[0];
    }, error => {
      console.error('Error fetching tour details:', error); // จับ error ถ้ามี
    });
  }
}
