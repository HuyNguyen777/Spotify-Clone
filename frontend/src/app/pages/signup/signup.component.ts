import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false,
})
export class SignupComponent {
  user_name: string = '';
  password: string = '';
  confirmPassword: string = '';  // Thêm biến confirmPassword
  fullname: string = '';
  birthday: string = '';
  email: string = '';
  phone: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const userData = {
      user_name: this.user_name,
      password: this.password,
      fullname: this.fullname,
      birthday: this.birthday,
      email: this.email,
      phone: this.phone
    };

    this.authService.register(userData).subscribe(
      (response) => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error during registration', error);
        this.errorMessage = error.error.error || 'An error occurred during registration.';
      }
    );
  }
}
