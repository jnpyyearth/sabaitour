import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GuideInOutbound, ProgramTour, ProgramTourForCard, Tour } from '../interfaces/tour';


const apiUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class ProgramTourService {

  getProgramTourById(ProgramTour: number): Observable<any> {
    console.log('hello by id',ProgramTour)
    return this.http.get<ProgramTourForCard>(`${apiUrl}/getProgramTourById/${ProgramTour}`);
  }

  constructor(private http: HttpClient) { }
  getAllTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${apiUrl}/tour`);
  }

  // ฟังก์ชันสำหรับดึงข้อมูล Guide
  getAllGuides(): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrl}/AllGuide`);
  }

  getInboundGuides():Observable<GuideInOutbound[]>{
    return this.http.get<GuideInOutbound[]>(`${apiUrl}/inbound-guide`);
  }

  getOutboundGuides():Observable<GuideInOutbound[]>{
    return this.http.get<GuideInOutbound[]>(`${apiUrl}/outbound-guide`);
  }

  getProgramTourCard():Observable<ProgramTourForCard[]>{
    return this.http.get<ProgramTourForCard[]>(`${apiUrl}/AllProgramTourForCard`);
  }


  // ฟังก์ชันสำหรับเพิ่มข้อมูล ProgramTour
  addProgramTour(programTour: any): Observable<any> {
    return this.http.post(`${apiUrl}/programtour`, programTour);
  }


  updateProgramTour(ProgramTour:any):Observable<any[]>{
    return this.http.put<any[]>(`${apiUrl}/updateProgramTour/${ProgramTour.ProgramTour_ID}`,ProgramTour)
  }
  updateGuideProfile(guideprofile:any):Observable<any[]>{
    return this.http.put<any[]>(`${apiUrl}/updateGuideProfile`,guideprofile)
  }
  
  cancelledProgramTour(ProgramTour:any):Observable<any[]>{
    return this.http.put<any[]>(`${apiUrl}/cancelledProgramTour/${ProgramTour.ProgramTour_ID}`,ProgramTour)
  }
  getOutboundProgramTour():Observable<any[]>{
    return this.http.get<any[]>(`${apiUrl}/getOutboundProgram`)
  }

  getInboundProgramTour():Observable<any[]>{
    return this.http.get<any[]>(`${apiUrl}/getInboundProgram`)
  }
  
  addbooking(booking:any):Observable<any[]>{
    return this.http.post<any[]>(`${apiUrl}/addBooking`,booking)
  }
  addreview(review:any):Observable<any[]>{
    return this.http.post<any[]>(`${apiUrl}/review`,review)
  }
}
