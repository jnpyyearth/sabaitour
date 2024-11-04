import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NewsComponent } from './news/news.component';
import { AccountComponent } from './account/account.component';

import { LogInComponent } from './log-in/log-in.component';
import { NationaltourComponent } from './nationaltour/nationaltour.component';
import { JapanTourComponent } from './international-tour/japan-tour/japan-tour.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeManagerComponent } from './Manager/home-manager/home-manager.component';
import { AddTourComponent } from './Manager/add-tour/add-tour.component';
import { ManagerInfoComponent } from './Manager/manager-info/manager-info.component';
import { SaleReportComponent } from './Manager/sale-report/sale-report.component';
import { NavbarManagerComponent } from './Manager/navbar-manager/navbar-manager.component';
import { SidebarManagerComponent } from './Manager/sidebar-manager/sidebar-manager.component';
import { MyTourProgramComponent } from './Guide/my-tour-program/my-tour-program.component';
import { NavbarGuideComponent } from './Guide/navbar-guide/navbar-guide.component';
import { SidebarGuideComponent } from './Guide/sidebar-guide/sidebar-guide.component';
import { HomeGuideComponent } from './Guide/home-guide/home-guide.component';
import { AllTourComponent } from './Manager/all-tour/all-tour.component';

import { GuideInfoComponent } from './Manager/guide-info/guide-info.component';
import { HttpClientModule } from '@angular/common/http'; 

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramTourCardComponent } from './Manager/program-tour-card/program-tour-card.component';
import { GuideRegistrationComponent } from './Manager/guide-registration/guide-registration.component';
import { EditProgramComponent } from './Manager/edit-program/edit-program.component';
import { EditprogramCardComponent } from './Manager/editprogram-card/editprogram-card.component';
import { HomeTourCardComponent } from './home/home-tour-card/home-tour-card.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { ProgramTourService } from './Service/program-tour.service';
import { NtCardComponent } from './nationaltour/nt-card/nt-card.component';
import { InterTouCardComponent } from './international-tour/inter-tou-card/inter-tou-card.component';
import { InternationaltourComponent } from './international-tour/internationaltour/internationaltour.component';
import { BookingComponent } from './booking/booking.component';
import { GuideInfoCardComponent } from './Manager/guide-info-card/guide-info-card.component';
import { MyTourProgramCardComponent } from './Guide/my-tour-program-card/my-tour-program-card.component';
import { MyInformationComponent } from './Guide/my-information/my-information.component';
import { ContactusComponent } from './contact-us/contact-us.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { ManagerRegsitrationComponent } from './Manager/manager-regsitration/manager-regsitration.component';
import { TouristDetailsComponent } from './Guide/tourist-details/tourist-details.component';
import { NoAccessComponent } from './no-access/no-access.component';

// import { GoogleChartsModule } from 'angular-google-charts';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    NewsComponent,
    AccountComponent,

    LogInComponent,
    NationaltourComponent,
    JapanTourComponent,
    NavbarComponent,
    HomeManagerComponent,
    AddTourComponent,
    ManagerInfoComponent,
    SaleReportComponent,
    NavbarManagerComponent,
    SidebarManagerComponent,
    MyTourProgramComponent,
    NavbarGuideComponent,  
    SidebarGuideComponent,
    HomeGuideComponent,
    AllTourComponent,
    GuideInfoComponent,
    ProgramTourCardComponent,
    GuideRegistrationComponent,
    EditProgramComponent,
    EditprogramCardComponent,
    HomeTourCardComponent,
    TourDetailComponent,
    NtCardComponent,
    InterTouCardComponent,
    InternationaltourComponent,
    BookingComponent,
    GuideInfoCardComponent,
    MyTourProgramCardComponent,
    MyInformationComponent,
    ContactusComponent,
    MyBookingComponent,
    ManagerRegsitrationComponent,
    TouristDetailsComponent,
    NoAccessComponent,
 


  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  
    HttpClientModule,
  ],
  

  providers: [
    ProgramTourService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
