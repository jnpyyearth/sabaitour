import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { AboutUsComponent } from './about-us/about-us.component';

import { LogInComponent } from './log-in/log-in.component';
import { NationaltourComponent } from './nationaltour/nationaltour.component';
import { JapanTourComponent } from './international-tour/japan-tour/japan-tour.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddTourComponent } from './Manager/add-tour/add-tour.component';
import { HomeManagerComponent } from './Manager/home-manager/home-manager.component';
import { ManagerInfoComponent } from './Manager/manager-info/manager-info.component';
import { NavbarManagerComponent } from './Manager/navbar-manager/navbar-manager.component';
import { SaleReportComponent } from './Manager/sale-report/sale-report.component';
import { SidebarManagerComponent } from './Manager/sidebar-manager/sidebar-manager.component';
import { SidebarGuideComponent } from './Guide/sidebar-guide/sidebar-guide.component';
import { NavbarGuideComponent } from './Guide/navbar-guide/navbar-guide.component';
import { HomeGuideComponent } from './Guide/home-guide/home-guide.component';
import { MyTourProgramComponent } from './Guide/my-tour-program/my-tour-program.component';
import { AllTourComponent } from './Manager/all-tour/all-tour.component';
import { GuideRegistrationComponent } from './Manager/guide-registration/guide-registration.component';
import { GuideInfoComponent } from './Manager/guide-info/guide-info.component';
import { EditProgramComponent } from './Manager/edit-program/edit-program.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { InternationaltourComponent } from './international-tour/internationaltour/internationaltour.component';
import { AuthGuard } from './auth.guard';
import { MyInformationComponent } from './Guide/my-information/my-information.component';
import { ContactusComponent } from './contact-us/contact-us.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { ManagerRegsitrationComponent } from './Manager/manager-regsitration/manager-regsitration.component';
import { TouristDetailsComponent } from './Guide/tourist-details/tourist-details.component';
import { NoAccessComponent } from './no-access/no-access.component';


const routes: Routes = [
    // { path: '', redirectTo: 'login', pathMatch: 'full' },
    // { path: 'home', component: HomeComponent ,canActivate: [AuthGuard],data:{roles:['manager']}},
    { path: 'home', component: HomeComponent,canActivate: [AuthGuard],data:{roles:['customer']} },
    { path: 'news', component: NewsComponent },
    { path: 'about-us', component: AboutUsComponent,canActivate: [AuthGuard],data:{roles:['customer']} },
    { path: 'contact-us', component: ContactusComponent,canActivate: [AuthGuard],data:{roles:['customer']} },
    {path: 'my-booking', component: MyBookingComponent,canActivate: [AuthGuard],data:{roles:['customer']} },
   
    { path: 'login', component: LogInComponent},
    
    { path: 'nationaltour', component: NationaltourComponent,canActivate: [AuthGuard],data:{roles:['customer']} },
    { path: 'japan-tour', component: JapanTourComponent},
    { path: 'navbar', component: NavbarComponent},
    { path: 'add-tour', component: AddTourComponent,canActivate: [AuthGuard],data:{roles:['manager']} },
    { path: 'home-manager', component: HomeManagerComponent,canActivate: [AuthGuard],data:{roles:['manager']} },
    { path: 'manager-info', component: ManagerInfoComponent},
    { path: 'navbar-manager', component: NavbarManagerComponent},
    { path: 'sale-report', component: SaleReportComponent,canActivate: [AuthGuard],data:{roles:['manager']} },
    { path: 'sidebar-manager', component: SidebarManagerComponent},
    { path: 'all-tour', component: AllTourComponent},
    { path: 'guide-regis', component: GuideRegistrationComponent,canActivate: [AuthGuard],data:{roles:['manager']} },
    { path: 'guide-info', component: GuideInfoComponent,canActivate: [AuthGuard],data:{roles:['manager']} },
    { path: 'sidebar-guide', component: SidebarGuideComponent},
    { path: 'navbar-guide', component: NavbarGuideComponent},
    { path: 'home-guide', component: HomeGuideComponent,canActivate: [AuthGuard],data:{roles:['guide']} },
    { path: 'my-tour-program', component: MyTourProgramComponent,canActivate: [AuthGuard],data:{roles:['guide']} },
    { path: 'edit-program', component: EditProgramComponent},
    { path: 'tour-detail/:id', component: TourDetailComponent,canActivate: [AuthGuard],data:{roles:['customer']} },
    { path: 'tourist-detail/:id', component: TouristDetailsComponent,canActivate: [AuthGuard],data:{roles:['guide']} },
    { path: 'internationaltour', component: InternationaltourComponent,canActivate: [AuthGuard],data:{roles:['customer']} },
    { path: 'my-information', component: MyInformationComponent,canActivate: [AuthGuard],data:{roles:['guide']} },
    { path: 'mg-regis', component: ManagerRegsitrationComponent,canActivate: [AuthGuard],data:{roles:['manager']} },
  {path:'NoAccess',component:NoAccessComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
