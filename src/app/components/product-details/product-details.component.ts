// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-products-detail',
//   standalone: false,
  
//   templateUrl: './products-detail.component.html',
//   styleUrl: './products-detail.component.css'
// })
// export class ProductsDetailComponent {

// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    this.fetchProductDetails(productId);
  }

  fetchProductDetails(productId: string | null): void {
    if (!productId) {
      return;
    }
    this.http.get<any>(`https://dummyjson.com/products/${productId}`).subscribe({
      next: (response) => {
        this.product = response;
      },
      error: (err) => {
        console.error('Failed to fetch product details', err);
      },
    });
  }

  backToProducts(): void {
    this.router.navigate(['/products']);
  }
}
