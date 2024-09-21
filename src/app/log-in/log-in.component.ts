import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  ngOnInit(): void {
    const container = document.getElementById('container') as HTMLElement | null;
    const registerBtn = document.getElementById('register') as HTMLElement | null;
    const loginBtn = document.getElementById('login') as HTMLElement | null;

    if (registerBtn && container) {
      registerBtn.addEventListener('click', () => {
        container?.classList.add("active");
      });
    }

    if (loginBtn && container) {
      loginBtn.addEventListener('click', () => {
        container?.classList.remove("active");
      });
    }
  }
}
