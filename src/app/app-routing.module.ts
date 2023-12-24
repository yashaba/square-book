import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { WhitelistPageComponent } from './pages/whitelist-page/whitelist-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { AuthGuard } from './services/auth/auth.service';


export const appRoutes: Routes = [

  {
    path: '',
    component: WelcomePageComponent,
  },
  {
    path: 'whitelist/:id?',
    component: WhitelistPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'books/:id?',
    component: SearchPageComponent,
    canActivate: [AuthGuard]

  }
]

