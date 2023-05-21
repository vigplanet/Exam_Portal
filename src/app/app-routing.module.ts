import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard.service';
import { HomeComponent } from './view/home/home.component';
import { IndexComponent } from './view/index/index.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,            
    pathMatch:'full',    
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'index',
  //   component: IndexComponent,            
  //   pathMatch:'full',    
  //   canActivate: [AuthGuard]
  // },
  {
    path: '**',
    redirectTo: 'home'

  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { useHash: false, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }