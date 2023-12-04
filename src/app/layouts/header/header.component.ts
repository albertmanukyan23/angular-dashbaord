import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}

  userEmail: string | null = '';
  isLoggedIn: Observable<boolean> = new Observable();

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user !== null) {
      this.userEmail =JSON.parse(user).email;
    }

    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
