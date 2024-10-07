import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GuideInOutbound, ProgramTour, ProgramTourForCard, Tour } from '../interfaces/tour';


const apiUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class ProgramTourService {

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
}
