import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule] // Add CommonModule here
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // To store error messages for the user

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    // Check if fields are filled
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    // Proceed with login if validation passes
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        this.authService.setToken(response.token);
        this.authService.setUserDetails(response);
        this.router.navigate(['/dashboard']); // Redirect to dashboard on successful login
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password. Please try again.';
        console.error('Login failed', err);
      }
    });
  }
}
