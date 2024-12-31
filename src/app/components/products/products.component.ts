// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-products',
//   standalone: false,
  
//   templateUrl: './products.component.html',
//   styleUrl: './products.component.css'
// })
// export class ProductsComponent {

// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  skip: number = 0;
  limit: number = 10;
  placeholderImage = 'https://via.placeholder.com/150';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.http
      .get<any>(`https://dummyjson.com/products?limit=${this.limit}&skip=${this.skip}`)
      .subscribe({
        next: (response) => {
          this.products = [...this.products, ...response.products];
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to fetch products', err);
          this.isLoading = false;
        },
      });
  }

  loadMore(): void {
    this.skip += this.limit;
    this.loadProducts();
  }

  onSearch(): void {
    if (this.searchTerm.length < 3) {
      return;
    }
    this.http
      .get<any>(`https://dummyjson.com/products/search?q=${this.searchTerm}`)
      .subscribe({
        next: (response) => {
          this.products = response.products;
        },
        error: (err) => {
          console.error('Search failed', err);
        },
      });
  }

  viewProductDetails(productId: number): void {
    console.log('Navigating to product details:', productId);  // Add logging
  this.router.navigate(['/dashboard/product-details', productId]);
  }
}

