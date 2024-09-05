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
import { JapanTourComponent } from './international-tour/japan-tour/japan-tour.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    NewsComponent,
    AccountComponent,
    LogOutComponent,
    LogInComponent,
    JapanTourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
