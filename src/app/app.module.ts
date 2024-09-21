import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

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
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
