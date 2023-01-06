import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeroesComponent } from "./heroes/heroes.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// Routes tell the Router which view to display for which URL
const routes: Routes = [
{path: '', redirectTo: '/dashboard', pathMatch:'full'},
{path:'heroes', component: HeroesComponent},
{path: 'dashboard', component: DashboardComponent},
{path: 'detail/:id', component: HeroDetailComponent}];

//The @NgModule metadata initializes the router and starts it listening for browser location changes.
@NgModule({
//The method is called forRoot() because you configure the router at the application's root level.
  imports: [RouterModule.forRoot(routes)],
//AppRoutingModule exports RouterModule to be available throughout the application
  exports: [RouterModule]
})

export class AppRoutingModule { }
