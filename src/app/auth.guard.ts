import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './Service/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // ตรวจสอบว่าผู้ใช้เข้าสู่ระบบยัง
    if (this.authService.isAuthenticated()) {
      const requiredRoles: string[] = route.data['roles'] || []; // รับ roles ที่จำเป็นจาก route

      // ดึง role ของผู้ใช้จาก AuthService
      const userRole = this.authService.getRole();
      
      // ถ้ามีการกำหนด roles ใน route และ role ของผู้ใช้ตรงกับ roles ที่ต้องการ
      if (requiredRoles.length === 0 || (userRole && requiredRoles.includes(userRole))) {
        return true; // อนุญาตให้เข้าถึงเส้นทางนี้ได้
      } else {
        this.router.navigate(['/NoAccess']);
        Swal.fire('ไม่มีสิทธิ์', 'ไม่สามารถเข้าถึงได้', 'error'); // เปลี่ยนเส้นทางไปยังหน้าที่ไม่อนุญาต
        return false; // ไม่อนุญาตให้เข้าถึง
      }
    } else {
      this.router.navigate(['/']); // เปลี่ยนเส้นทางไปยังหน้า login ถ้าผู้ใช้ไม่ได้เข้าสู่ระบบ
      return false;
    }
  }
}