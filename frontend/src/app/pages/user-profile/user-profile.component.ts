import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  token = localStorage.getItem('access_token')!;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.token) {
      this.authService.getUserByToken(this.token).subscribe(
        (res) => {
          this.user = res;
        },
        (err) => {
        }
      );
    }
  }

  onEdit(): void {
    // Điều hướng tới form chỉnh sửa hồ sơ
    this.router.navigate(['/edit-profile']);
  }

  onLogout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/login']);
        Swal.fire('Logged out', 'You have been logged out successfully.', 'success');
      }
    });
  }
  
  backTohome(): void {
    this.router.navigate(['/home']);
  }
}
