import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  goBack(): void {
    window.history.back(); // ฟังก์ชันนี้จะพาผู้ใช้กลับไปหน้าก่อนหน้านี้
  }
}
