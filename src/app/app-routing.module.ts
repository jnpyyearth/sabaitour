import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LogOutComponent } from './log-out/log-out.component';
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


const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    // { path: 'home', component: HomeComponent ,canActivate: [AuthGuard],data:{roles:['manager']}},
    { path: 'home', component: HomeComponent },
    { path: 'news', component: NewsComponent },
    { path: 'about-us', component: AboutUsComponent},
    { path: 'log-out', component: LogOutComponent},
    { path: 'login', component: LogInComponent},
    { path: 'about-us', component: AboutUsComponent},
    { path: 'nationaltour', component: NationaltourComponent},
    { path: 'japan-tour', component: JapanTourComponent},
    { path: 'navbar', component: NavbarComponent},
    { path: 'add-tour', component: AddTourComponent},
    { path: 'home-manager', component: HomeManagerComponent},
    { path: 'manager-info', component: ManagerInfoComponent},
    { path: 'navbar-manager', component: NavbarManagerComponent},
    { path: 'sale-report', component: SaleReportComponent},
    { path: 'sidebar-manager', component: SidebarManagerComponent},
    { path: 'all-tour', component: AllTourComponent},
    { path: 'guide-regis', component: GuideRegistrationComponent},
    { path: 'guide-info', component: GuideInfoComponent},
    { path: 'sidebar-guide', component: SidebarGuideComponent},
    { path: 'navbar-guide', component: NavbarGuideComponent},
    { path: 'home-guide', component: HomeGuideComponent},
    { path: 'my-tour-program', component: MyTourProgramComponent},
    { path: 'edit-program', component: EditProgramComponent},
    { path: 'tour-detail/:id', component: TourDetailComponent},
    { path: 'internationaltour', component: InternationaltourComponent},
    { path: 'my-information', component: MyInformationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
