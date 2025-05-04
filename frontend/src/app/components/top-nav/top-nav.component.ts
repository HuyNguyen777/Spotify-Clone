import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarService } from '../../services/searchbar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-nav',
  standalone: false,
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent implements OnInit {
  public isSearchFieldVisible: boolean = false;
  @Output() public inputFilterRes: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router, private sb: SearchBarService, private authService: AuthService) {}
  isLoggedIn = false;
  user: any = null;
  isUserMenuVisible = false;

  ngOnInit(): void {
    this.sb.isSearchVisible.subscribe((status) => {
      this.isSearchFieldVisible = status;
    });
    const token = localStorage.getItem('access_token');
    if (token) {
      this.authService.getUserByToken(token).subscribe(
        (res) => {
          this.user = res;
          this.isLoggedIn = true;
        },
        (err) => {
          this.isLoggedIn = false;
        }
      );
    }
      
  }
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-avatar-wrapper')) {
      this.isUserMenuVisible = false;
    }
  }
  toggleUserMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isUserMenuVisible = !this.isUserMenuVisible;
    console.log('Menu toggled:', this.isUserMenuVisible);
  }
  
  
  onViewProfile() {
    // Navigate to profile page
    this.router.navigate(['/user-profile']);

  }
  
  onEditInfo() {
    // Navigate to edit info page
  }
  
  
  onLogout() {
    localStorage.removeItem('access_token');
    this.isLoggedIn = false;
    this.user = null;
  }

  onNavigateToLogin() {
    this.router.navigate(['/', 'login']);
  }
  onNavigateToChat() {
    this.router.navigate(['/', 'search']);
  }
  OnNavigateToSignUp(){
    this.router.navigate(['/', 'signup']);
  }

  filterBrowsingList(inputElement: HTMLInputElement) {
    // console.log(inputElement);
    this.inputFilterRes.emit(inputElement.value);
  }
}
