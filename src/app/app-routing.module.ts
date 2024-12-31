// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { AuthGuard } from './guards/auth.guard';
// import { ProductsComponent } from './components/products/products.component';
// import { ProductDetailsComponent } from './components/product-details/product-details.component';


// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
//   { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
//   { path: 'product-details/:productId', component: ProductDetailsComponent, canActivate: [AuthGuard] }
// ];
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // Dashboard route with child routes
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard], 
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'product-details/:productId', component: ProductDetailsComponent },
      { path: 'profile', component: ProfileComponent }, 
      { path: '', redirectTo: 'products', pathMatch: 'full' }  // Default child route
    ]
  },

  // { 
  //   path: 'profile', 
  //   component: ProfileComponent,  // Profile will be rendered directly when navigating to '/profile'
  //   canActivate: [AuthGuard] 
  // },

  // Redirect if the user tries to access product directly without being logged in
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
