import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LogOutComponent } from './log-out/log-out.component';
import { LogInComponent } from './log-in/log-in.component';
import { JapanTourComponent } from './international-tour/japan-tour/japan-tour.component';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'news', component: NewsComponent },
    { path: 'about-us', component: AboutUsComponent},
    { path: 'log-out', component: LogOutComponent},
    { path: 'log-in', component: LogInComponent},
    { path: 'about-us', component: AboutUsComponent},
    { path: 'japan-tour', component: JapanTourComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
