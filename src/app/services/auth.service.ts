import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://dummyjson.com/auth'; // Replace with your API URL
  private token: string | null = null;
  private userDetails: any = null; // Store user details after login

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        const token = response.accessToken;
        if (token) {
          this.setToken(token); // Save token to local storage
        }
      })
    );
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('access_token', token);
    console.log('Token saved to localStorage:', token);
  }

  // getToken(): string | null {
  //   const token = this.token || localStorage.getItem('access_token');
  //   console.log('Retrieved Token:', token);  // Add logging for debugging
  //   return token;
  // }
  getToken(): string | null {
    const tokenFromLocalStorage = localStorage.getItem('access_token');
    console.log('Retrieved Token from localStorage:', tokenFromLocalStorage);  // Log here
    return tokenFromLocalStorage;  // Ensure this is the correct retrieval process
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

  isAuthenticated(): boolean {
    const token = this.getToken();
  console.log('Is user authenticated? Token:', token);  // Log here
  return !!token;  // Returns true if the token exists
  }

  logout(): void {
    this.token = null;
    this.userDetails = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_details');
    this.router.navigate(['/login']);
  }
  
}
