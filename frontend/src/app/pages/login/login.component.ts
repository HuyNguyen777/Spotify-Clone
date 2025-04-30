import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public usernameFormControl = new FormControl('', [Validators.required]);
  public passwordFormControl = new FormControl('', [Validators.minLength(4)]);

  public userForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: this.usernameFormControl,
      password: this.passwordFormControl,
    });
  }

  onLogin() {
    if (this.userForm.valid) {
      const username = this.userForm.value.username;
      const password = this.userForm.value.password;
  
      this.authService.login(username, password).subscribe({
        next: (data) => {
          this.authService.saveToken(data.access); // Lưu token vào localStorage hoặc state
          localStorage.setItem('username', username);

          alert('Login Successful');
          this.router.navigate(['/']); // Chuyển hướng người dùng sau khi đăng nhập thành công
        },
        error: (err) => {
          console.error('Login failed:', err); // In lỗi ra console để dễ dàng gỡ lỗi
          alert('Login Failed');
        }
      });
    } else {
      alert('Please fill in all fields correctly!');
    }
  }
  
}
