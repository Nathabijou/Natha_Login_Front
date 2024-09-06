import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { ManagerComponent } from './manager/manager.component';
import { ModerantComponent } from './moderant/moderant.component';
// import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'manager', component: ManagerComponent, canActivate:[AuthGuard], data:{roles:['Manager']} },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'moderant', component: ModerantComponent ,  canActivate:[AuthGuard], data:{roles:['Moderant']} },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  // { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
