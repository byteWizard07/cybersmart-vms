// import { Component } from '@angular/core';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent {
//   constructor(private authService: AuthService) {}
//   logout(): void {
//     this.authService.logout();
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class DashboardComponent {
  showProfileMenu = false; // Controls profile dropdown visibility
  activePage = 'products'; // Tracks active sidebar link
  user: any = null; // User details

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUserDetails(); // Fetch user details from the service
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  navigateTo(page: string): void {
    this.activePage = page;
    if (page === 'products') {
      this.router.navigate(['/dashboard/products']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
