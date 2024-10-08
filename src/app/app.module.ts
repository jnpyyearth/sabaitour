import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NewsComponent } from './news/news.component';
import { AccountComponent } from './account/account.component';
import { LogOutComponent } from './log-out/log-out.component';
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
import { GuideIntourComponent } from './Manager/guide-intour/guide-intour.component';
import { GuideInfoComponent } from './Manager/guide-info/guide-info.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    NewsComponent,
    AccountComponent,
    LogOutComponent,
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
    GuideIntourComponent,
    GuideInfoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
