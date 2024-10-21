import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GuideInOutbound, ProgramTour, ProgramTourForCard, Tour } from '../interfaces/tour';


const apiUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class ProgramTourService {

  addOriginalTour(formData: FormData): Observable<any> {
    return this.http.post(`${apiUrl}/addTour`, formData);
  }
  
  Guideprofile(username:string): Observable<any> {
    return this.http.post(`${apiUrl}/guideProfile`, {username});
  }


  getProgramTourById(ProgramTour: number): Observable<any> {
    console.log('hello by id',ProgramTour)
    return this.http.get<ProgramTourForCard>(`${apiUrl}/getProgramTourById/${ProgramTour}`);
  }
  getTouristById(ProgramTour: number): Observable<any> {
    console.log('hello by id',ProgramTour)
    return this.http.get<any>(`${apiUrl}/getTouristById/${ProgramTour}`);
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
  updatepayment(Booking_ID:number):Observable<any[]>{
    return this.http.put<any[]>(`${apiUrl}/updatePayment/${Booking_ID}`,{})
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
  getReviewsForTour(tourId: number): Observable<any[]> {
    console.log('hello service tourId =',tourId)
    return this.http.get<any[]>(`${apiUrl}/getreview/${tourId}`);
   
  }
  getCustomerInfo(username: string): Observable<any> {
    return this.http.post<any>(`${apiUrl}/getCus_ID`, { username });
  }

  getmybooked(Cus_ID:number): Observable<any[]>{
    return this.http.get<any[]>(`${apiUrl}/getmybooked/${Cus_ID}`)
  }
  getParticipants(): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrl}/getParticipants`);
  }
  
  bookcanceling(Booking:any):Observable<any[]>{
    return this.http.put<any[]>(`${apiUrl}/bookedCancelling/${Booking.Booking_ID}`,Booking)
  }
  getMyProgramForGuide(username:string):Observable<any[]>{
    return this.http.post<any[]>(`${apiUrl}/getProgramTourForGuide`, {username})
  }
}
