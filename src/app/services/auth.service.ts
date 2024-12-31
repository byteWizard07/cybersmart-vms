import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://dummyjson.com/auth'; // Replace with your API URL
  private token: string | null = null;
  private userDetails: any = null; // Store user details after login

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('access_token');
  }

  setUserDetails(user: any): void {
    this.userDetails = user;
    localStorage.setItem('user_details', JSON.stringify(user)); // Persist user details
  }

  getUserDetails(): any {
    if (this.userDetails) {
      return this.userDetails;
    }

    // Load from localStorage if not already set
    const storedUser = localStorage.getItem('user_details');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  logout(): void {
    this.token = null;
    this.userDetails = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_details');
    this.router.navigate(['/login']);
  }

  // isAuthenticated(): boolean {
  //   return this.getToken() !== null;
  // }
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Returns true if token exists
  }
  
}
