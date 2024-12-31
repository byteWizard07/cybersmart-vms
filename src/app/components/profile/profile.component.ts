import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class ProfileComponent {
  user: any = null; // User details

  constructor(private authService: AuthService) {
    this.user = this.authService.getUserDetails(); // Fetch user details from the service
  }
}
