import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProgramTourService } from '../../Service/program-tour.service';
import { Observable } from 'rxjs';
import { response } from 'express';


@Component({
  selector: 'app-sale-report',
  templateUrl: './sale-report.component.html',
  styleUrl: './sale-report.component.css'
})



export class SaleReportComponent implements OnInit{
  reports:any[]=[];
  popularTour:any;
  mostincome:any;
  Totalrevenue:any;
  guide:any
  inguide:any
  outguide:any
  manager:any
  allpar:any
  paidpar:any
  pendingpar:any
  selectedSortOrder: string = 'ascending';

  countprograminbound: any;
  countprogramoutbound: any;

  // ซน1
  // กำหนดค่าเริ่มต้นสำหรับ PieChart
  // public pieChart: GoogleChartInterface = {
  //   chartType: 'PieChart',
  //   dataTable: [
  //     ['Task', 'Programs'],
  //     ['ในประเทศ', 4], 
  //     ['ต่างประเทศ', 6] 
  //   ],
  //   options: {
  //     title: 'Tour Programs',
  //     width: 400,
  //     height: 300
  //   }
  // };

  // ซน2



  constructor(private tourService: ProgramTourService, private http: HttpClient) { }
 ngOnInit(): void {
     this.tourService.getReportOverview().subscribe(
      (response:any)=>{
        this.reports = response.result.recordset; 
        console.log('hello report',this.reports)
       
        
      },(error)=>{
          console.log('error',error)
      }

     )
     this.tourService.getPopularTour().subscribe(
      (response:any)=>{
        this.popularTour = response.populartour; 
        console.log('hello popular',this.popularTour)
       
        
      },(error)=>{
          console.log('error',error)
      }
      
     )
     this.tourService.getmostincome().subscribe(
      (response:any)=>{
        this.mostincome = response.mostincome; 
        console.log('hello mostincome',this.mostincome)
       
        
      },(error)=>{
          console.log('error',error)
      }
    )
    this.tourService.getTotalRevenue().subscribe(
      (response:any)=>{
        this.Totalrevenue = response.revenue; 
        console.log('hello mostincome',this.Totalrevenue)
       
        
      },(error)=>{
          console.log('error',error)
      }
    )
  
    this.tourService.getmanager().subscribe(
      (response:any)=>{
        this.manager = response.manager; 
        console.log('hello mostincome',this.manager)
       
        
      },(error)=>{
          console.log('error',error)
      }
    )
    this.tourService.getguide().subscribe(
      (response:any)=>{
        this.guide= response.guide; 
        console.log('hello mostincome',this.guide)
       
        
      },(error)=>{
          console.log('error',error)
      }
    )
    this.tourService.getinboundguide().subscribe(
      (response:any)=>{
        this.inguide = response.inboundguide; 
        console.log('hello mostincome',this.inguide)
       
        
      },(error)=>{
          console.log('error',error)
      }
    )
    this.tourService.getoutboundguide().subscribe(
      (response:any)=>{
        this.outguide = response.outboundguide; 
        console.log('hello mostincome',this.outguide)
       
        
      },(error)=>{
          console.log('error',error)
      }
    )
    this.tourService.getallpar().subscribe(
      (response:any)=>{
        this.allpar = response.allpar; 
        console.log('hello allpar',this.allpar)
       
        
      },(error)=>{
          console.log('error',error)
      }
    )
    this.tourService.getpendingpar().subscribe(
      (response:any)=>{
        this.pendingpar = response.pending; 
        console.log('hello pending',this.pendingpar)
       
        
      },(error)=>{
          console.log('error',error)
      }
    )
    this.tourService.getpaidpar().subscribe(
      (response:any)=>{
        this.paidpar = response.paid; 
        console.log('hello paid',this.paidpar)
       
        
      },(error)=>{
          console.log('error',error)
      }
    )


    // ซน 1
    this.tourService.getcountprograminbound().subscribe(
      (response:any)=>{
        this.countprograminbound = response.countinbound; 
        console.log('hello count program inbound',this.countprograminbound)
      },(error)=>{
          console.log('error',error)
      }

     )

    this.tourService.getcountprogramoutbound().subscribe(
      (response:any)=>{
        this.countprogramoutbound = response.countoutbound; 
        console.log('hello count program outbound',this.countprogramoutbound)
      },(error)=>{
          console.log('error',error)
      }
     )
     

    // ซน 2 
    
  


}



     



 













 counter =0;
 count(index:number):number{
  return ++this.counter;
 }

onSortOrderChange(): void {
  if (this.selectedSortOrder === 'ascending') {
    this.reports.sort((a, b) => (a.Price_per_person * a.Total_tourist) - (b.Price_per_person * b.Total_tourist));
  } else if (this.selectedSortOrder === 'descending') {
    this.reports.sort((a, b) => (b.Price_per_person * b.Total_tourist) - (a.Price_per_person * a.Total_tourist));
  } 
}
}


